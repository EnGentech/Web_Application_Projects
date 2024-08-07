from django.db import models

# Create your models here.

class Student_data(models.Model):
    email = models.EmailField(max_length=100, unique=True)
    regNumber = models.IntegerField(unique=True)
    department = models.CharField(max_length=100, null=True)

class Attendance(models.Model):
    course_code = models.CharField(max_length=100)
    date = models.DateField(unique=True)
    start_time = models.DateTimeField(auto_now=True)
    end_time = models.DateTimeField(auto_now=False)
    total_students = models.IntegerField()
    present_students = models.IntegerField()
    _student = models.ForeignKey(Student_data, related_name='attendance', on_delete=models.CASCADE)
    