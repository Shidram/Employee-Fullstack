from django.contrib import admin
from employee.models import EmployeeModel

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('firstname','lastname','Date_of_joining','department','city')

admin.site.register(EmployeeModel, EmployeeAdmin)
# Register your models here.
