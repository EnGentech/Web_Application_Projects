from django.db import models

class Courses(models.Model):
    """Creating Courses model"""
    faculty = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    option = models.CharField(max_length=100, null=True)
    course_code = models.CharField(max_length=100)
    course_title = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
