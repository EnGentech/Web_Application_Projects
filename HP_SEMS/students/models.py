from django.db import models

# Create your models here.

class Student_data(models.Model):
    email = models.EmailField(max_length=100, unique=True)
    regNumber = models.IntegerField(unique=True)
    department = models.CharField(max_length=100, null=True)

class Attendance(models.Model):
    course_code = models.CharField(max_length=100)
    date = models.DateField(unique=True)
    start_time = models.TimeField()
    end_time = models.TimeField()
    total_students = models.IntegerField()
    present_students = models.IntegerField()
    