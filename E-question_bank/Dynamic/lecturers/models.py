from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import FileExtensionValidator
from courses.models import Courses

# Create your models here.
class Lecturer(AbstractUser):
    """Creating Upload model"""
    faculty = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    groups = models.ManyToManyField(Group, related_name="lecturer_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="lecturers_permissions", blank=True)


class Upload(models.Model):
    """Creating Upload model"""
    year = models.CharField(max_length=100)
    semester = models.CharField(max_length=100)
    pdf_file = models.FileField(upload_to='pdfs/exams/', validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    answer_file = models.FileField(upload_to='pdfs/answers/', validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    courses = models.ForeignKey(Courses, on_delete=models.CASCADE, null=True)

class Resources(models.Model):
    """Model for uploading resources"""
    faculty = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    course_code = models.CharField(max_length=100)
    course_title = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    semester = models.CharField(max_length=100)
    lectureMaterial = models.FileField(upload_to='pdfs/lecture_materials/', validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    site_recommendation = models.CharField(max_length=255)
    youtube_channel = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=True)