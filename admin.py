from django.contrib import admin
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        'company_name',
        'name',
        'employee_id',
        'location',
        'designation',
        'shift_timing',
        'salary',
        'date_of_joining',
        'email',
        'address',
        'phone_number',
        'extra_working_hours',
        'extra_hourly_fees',
        # 'bonus',
        'pf',
        'income_tax'
    )
