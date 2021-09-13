from django.urls import path
from employee.views import (
    EmployeeAPIView,
    EmployeeUpdateAPIView,
    EmployeeDeleteAPIView,
    EmployeeSearchAPIView)

urlpatterns = [
    path('', EmployeeAPIView.as_view()),
    path('update/<int:pk>', EmployeeUpdateAPIView.as_view()),
    path('delete/<int:pk>', EmployeeDeleteAPIView.as_view()),
    path('search/<str:searchField>', EmployeeSearchAPIView.as_view()),
]
