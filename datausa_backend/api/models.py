from django.db import models

class PopulationData(models.Model):
    id_state = models.CharField(max_length=20)
    state = models.CharField(max_length=50)
    id_year = models.IntegerField()
    year = models.CharField(max_length=10)
    population = models.IntegerField()
    slug_state = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.state} - {self.year}"

class VehicleOwnershipData(models.Model):
    id_vehicles_available = models.IntegerField()
    vehicles_available = models.CharField(max_length=50)
    id_year = models.IntegerField()
    year = models.CharField(max_length=10)
    commute_means_by_gender = models.IntegerField()
    geography = models.CharField(max_length=50)
    id_geography = models.CharField(max_length=20)
    slug_geography = models.CharField(max_length=50)
    households = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.vehicles_available} - {self.year}"
