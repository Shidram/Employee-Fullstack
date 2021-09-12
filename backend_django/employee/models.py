from django.db import models

# Create your models here.
class EmployeeModel(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    Date_of_joining = models.DateField()
    department = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)

    def __str__(self):
        return self.firstname