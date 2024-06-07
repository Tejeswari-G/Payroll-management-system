from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    net_salary = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = '__all__'

    def get_net_salary(self, obj):
        return obj.calculate_net_salary()
