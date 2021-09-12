from django.urls import path
from employee.views import (
    EmployeeAPIView,
    EmployeeUpdateAPIView,
    EmployeeDeleteAPIView)

urlpatterns = [
    path('', EmployeeAPIView.as_view()),
    path('update/<int:pk>', EmployeeUpdateAPIView.as_view()),
    path('delete/<int:pk>', EmployeeDeleteAPIView.as_view()),
]