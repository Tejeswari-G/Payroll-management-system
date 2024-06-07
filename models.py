from django.db import models

class Employee(models.Model):
    company_name = models.CharField(max_length=100, default='XYZ Pvt Ltd')
    name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    shift_timing = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    date_of_joining = models.DateField()
    email = models.EmailField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    extra_working_hours = models.DecimalField(max_digits=5, decimal_places=2)
    extra_hourly_fees = models.DecimalField(max_digits=10, decimal_places=2)
    # bonus = models.DecimalField(max_digits=10, decimal_places=2)
    pf = models.DecimalField(max_digits=10, decimal_places=2)
    income_tax = models.DecimalField(max_digits=10, decimal_places=2)

    def calculate_net_salary(self):
        extra_income = self.extra_working_hours * self.extra_hourly_fees
        return self.salary + extra_income - self.income_tax

    def __str__(self):
        return self.name



