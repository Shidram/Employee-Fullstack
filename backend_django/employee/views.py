from django.shortcuts import render
from employee.serializers import EmployeeSerializer
from employee.models import EmployeeModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

# Create your views here.

class EmployeeAPIView(APIView):
    def get(self,request):
        employeeObj = EmployeeModel.objects.all().order_by('firstname')
        employeeSerializeObj = EmployeeSerializer(employeeObj,many=True)
        
        tag = request.GET.get('tag',None)
        if tag is not None:
            search = "%{}%".format(tag)
            employeesSearchObj = EmployeeModel.objects.filter(firstname__icontains=search)
            employeeSearchSerializeObj = EmployeeSerializer(employeesSearchObj,many=True)
            return Response({
                    'success': status.HTTP_200_OK,
                    'data': employeeSearchSerializeObj.data
                })
        return Response({
                    'success': status.HTTP_200_OK,
                    'data': employeeSerializeObj.data
                })

    def post(self, request):
        serializeObj = EmployeeSerializer(data=request.data)
        if serializeObj.is_valid():
            serializeObj.save()
            return Response({
                    'status': status.HTTP_201_CREATED,
                    'message': 'Employee Created Successfully.',
                    'data':serializeObj.data,
                })
        return Response(serializeObj.errors)

class EmployeeSearchAPIView(APIView):
    def post(self, request, searchField):
        try:
            if searchField is not None:
                modelFields = [f.name for f in EmployeeModel._meta.get_fields()]

                searchParam = list(x.strip() for x in searchField.split(':'))
                if searchParam[0] in modelFields and len(searchParam)>1:
                    lookups= Q(**{"%s__icontains" % searchParam[0]:str(searchParam[1])})
                    employeesSearchObj = EmployeeModel.objects.filter(lookups)
                else:
                    employeesSearchObj = EmployeeModel.objects.filter(firstname__icontains=str(searchField))
        except:            
            return Response({
                'status': status.HTTP_404_NOT_FOUND,
                'message': 'Failed to Search, Employees Not Found.',
                'data':'',
            })        
        employeeSearchSerializeObj = EmployeeSerializer(employeesSearchObj, many=True)

        return Response({
                'success': status.HTTP_200_OK,
                'data': employeeSearchSerializeObj.data
            })

class EmployeeUpdateAPIView(APIView):
    def post(self, request, pk):
        try:
            employeeObj = EmployeeModel.objects.get(pk=pk)
        except:
            return Response({
                'status': status.HTTP_404_NOT_FOUND,
                'message': 'Updation Failed, Employee Not Found.',
                'data':'',
            })
        serializeObj = EmployeeSerializer(employeeObj, data=request.data)
        if serializeObj.is_valid():
            serializeObj.save()
            return Response({
                    'status':status.HTTP_200_OK,
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
                'status': status.HTTP_404_NOT_FOUND,
                'message': 'Deletion Failed, Employee Not Found.',
                'data':'',
            })
        employeeObj.delete()
        return Response({
                'status': status.HTTP_200_OK,
                'message': 'Employee Deleted Successfully.',
                'data':''
            })
