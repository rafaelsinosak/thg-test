import graphene
from graphene_django import DjangoObjectType
import requests
from decouple import config
from .models import PopulationData, VehicleOwnershipData

class PopulationType(DjangoObjectType):
    class Meta:
        model = PopulationData

class VehicleOwnershipType(DjangoObjectType):
    class Meta:
        model = VehicleOwnershipData

class Query(graphene.ObjectType):
    population_data = graphene.List(PopulationType, states=graphene.List(graphene.String), start_year=graphene.Int(), end_year=graphene.Int())
    vehicle_ownership_data = graphene.List(VehicleOwnershipType, year=graphene.Int())

    def resolve_population_data(self, info, states=None, start_year=None, end_year=None):
        api_base_url = config('DATAUSA_API_BASE_URL')
        response = requests.get(f'{api_base_url}?drilldowns=State&measures=Population')
        data = response.json()['data']
        
        if not states:
            states = set(item.get('State') for item in data)
        if not start_year:
            start_year = min(int(item.get('Year')) for item in data)
        if not end_year:
            end_year = max(int(item.get('Year')) for item in data)

        filtered_data = [
            PopulationData(
                id_state=item.get('ID State'),
                state=item.get('State'),
                id_year=item.get('ID Year'),
                year=item.get('Year'),
                population=item.get('Population'),
                slug_state=item.get('Slug State')
            )
            for item in data
            if item.get('State') in states and start_year <= int(item.get('Year')) <= end_year
        ]

        return filtered_data

    def resolve_vehicle_ownership_data(self, info, year=None):
        api_base_url = config('ZIRCON_API_BASE_URL')
        response = requests.get(f'{api_base_url}?measure=Commute%20Means%20by%20Gender&geo=01000US&drilldowns=Vehicles%20Available')
        data = response.json()['data']
        
        if not year:
            years = set(int(item.get('Year')) for item in data)
            year = max(years)

        filtered_data = [
            VehicleOwnershipData(
                id_vehicles_available=item.get('ID Vehicles Available'),
                vehicles_available=item.get('Vehicles Available'),
                id_year=item.get('ID Year'),
                year=item.get('Year'),
                commute_means_by_gender=item.get('Commute Means by Gender'),
                geography=item.get('Geography'),
                id_geography=item.get('ID Geography'),
                slug_geography=item.get('Slug Geography'),
                households=item.get('Households')
            )
            for item in data
            if int(item.get('Year')) == year
        ]

        return filtered_data

schema = graphene.Schema(query=Query)
