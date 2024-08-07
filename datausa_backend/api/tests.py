from django.test import TestCase
from graphene.test import Client
from api.schema import schema

class GraphQLTestCase(TestCase):
    def test_population_data(self):
        client = Client(schema)
        executed = client.execute('''
            query {
                populationData(states: ["Alabama", "Florida", "California"], startYear: 2013, endYear: 2021) {
                    state
                    year
                    population
                }
            }
        ''')
        self.assertNotIn('errors', executed)
        self.assertGreater(len(executed['data']['populationData']), 0)

    def test_vehicle_ownership_data(self):
        client = Client(schema)
        executed = client.execute('''
            query {
                vehicleOwnershipData(year: 2021) {
                    idVehiclesAvailable
                    vehiclesAvailable
                    idYear
                    year
                    commuteMeansByGender
                    geography
                    idGeography
                    slugGeography
                    households
                }
            }
        ''')
        self.assertNotIn('errors', executed)
        self.assertGreater(len(executed['data']['vehicleOwnershipData']), 0)
