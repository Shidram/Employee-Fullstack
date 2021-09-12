# from backend_django import employee
from django.shortcuts import render
from rest_framework.fields import empty
from employee.serializers import EmployeeSerializer
from employee.models import EmployeeModel
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class EmployeeAPIView(APIView):
    def get(self,request):
        employeeObj = EmployeeModel.objects.all()
        employeeSerializeObj = EmployeeSerializer(employeeObj,many=True)
        return Response({
                    'success':True,
                    'data': employeeSerializeObj.data
                })

    def post(self, request):
        serializeObj = EmployeeSerializer(data=request.data)
        if serializeObj.is_valid():
            serializeObj.save()
            return Response({
                    'status': 200,
                    'message': 'Employee Created Successfully.',
                    'data':serializeObj.data,
                })
        return Response(serializeObj.errors)

class EmployeeUpdateAPIView(APIView):
    def post(self, request, pk):
        try:
            employeeObj = EmployeeModel.objects.get(pk=pk)
        except:
            return Response({
                'message': 'Updation Failed, Employee Not Found.',
                'data':'',
            })
        serializeObj = EmployeeSerializer(employeeObj, data=request.data)
        if serializeObj.is_valid():
            serializeObj.save()
            return Response({
                    'status': 200,
                    'message': 'Employee Updated Successfully.',
                    'data':serializeObj.data,
                })
        return Response(serializeObj.errors)

class EmployeeDeleteAPIView(APIView):
    def post(self, request, pk):
        try:
            employeeObj = EmployeeModel.objects.get(pk=pk)
        except:
            return Response({
                'message': 'Deletion Failed, Employee Not Found.',
                'data':'',
            })
        employeeObj.delete()
        return Response({
                'status': 200,
                'message': 'Employee Deleted Successfully.',
                'data':''
            })