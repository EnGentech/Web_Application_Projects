from django.db import models
from django.db.models import Sum
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import FileExtensionValidator

class Students_data(AbstractUser):
    """Creating Students_data model"""
    faculty_choices = [
        ("Choose faculty", "Choose faculty"),
        ("Engineering", "Engineering"),
        ("Environmental Science", "Environmental Science"),
        ("Management Science", "Management Science"),
        ("Science and Technology", "Science and Technology"),
    ]

    department_choices = [
        ("Choose department", "Choose department"),
        ("Chemical Engineering", "Chemical Engineering"),
        ("Civil Engineering", "Civil Engineering"),
        ("Computer Engineering", "Computer Engineering"),
        ("Electrical Engineering", "Electrical Engineering"),
        ("Mechanical Engineering", "Mechanical Engineering"),
        ("Metallurgical and Materials Engineering", "Metallurgical and Materials Engineering"),
        ("Polymer and Textile Engineering", "Polymer and Textile Engineering"),
        ("Architecture", "Architecture"),
        ("Building Technology", "Building Technology"),
        ("Estate Management", "Estate Management"),
        ("Quantity Surveying", "Quantity Surveying"),
        ("Surveying and Geoinformatics", "Surveying and Geoinformatics"),
        ("Urban and Regional Planning", "Urban and Regional Planning"),
        ("Accountancy", "Accountancy"),
        ("Banking and Finance", "Banking and Finance"),
        ("Business Administration", "Business Administration"),
        ("Cooperative Economics and Management", "Cooperative Economics and Management"),
        ("Marketing", "Marketing"),
        ("Public Administration", "Public Administration"),
        ("Pure and Industrial Chemistry", "Pure and Industrial Chemistry"),
        ("Computer Science", "Computer Science"),
        ("Mathematics", "Mathematics"),
        ("Microbiology", "Microbiology"),
        ("Physics with Electronics", "Physics with Electronics"),
        ("Statistics", "Statistics"),
        ("Biological Sciences", "Biological Sciences"),
        ("Geology", "Geology"),
        ("Science Laboratory Technology", "Science Laboratory Technology"),
        ("Food Science and Technology", "Food Science and Technology"),
        ("Science Laboratory Technology", "Science Laboratory Technology"),
    ]
    
    email = models.EmailField(max_length=255, unique=True)
    otherName = models.CharField(max_length=50, null=True)
    faculty = models.CharField(max_length=100, choices=faculty_choices, default="Choose faculty")
    department = models.CharField(max_length=100, choices=department_choices, default="Choose faculty")
    profile_picture = models.FileField(upload_to="images/student_profile_picture", validators=[FileExtensionValidator(allowed_extensions=['png', 'PNG', 'jpg', 'jpeg'])], null=True)
    option = models.CharField(max_length=100, null=True)
    regNumber = models.IntegerField(unique=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    groups = models.ManyToManyField(Group, related_name="students_data_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="students_data_permissions", blank=True)

class CourseWork(models.Model):
    """Students course details"""
    level = models.CharField(max_length=100)
    semester = models.CharField(max_length=100)
    courseCode = models.CharField(max_length=20)
    courseTitle = models.CharField(max_length=100)
    scorePerCourse = models.IntegerField(null=True)
    student = models.ForeignKey(Students_data, on_delete=models.CASCADE, null=True)


class Transaction(models.Model):
    """Creating Transaction model"""
    regNumber = models.IntegerField()
    userName = models.CharField(max_length=100)
    amount = models.IntegerField()
    transaction_id = models.CharField(max_length=100)
    transaction_status = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    student = models.ForeignKey(Students_data, on_delete=models.CASCADE, null=True)



class Assessment(models.Model):
    """Assessment table generation"""
    student = models.ForeignKey(Students_data, on_delete=models.CASCADE, null=True)
    course_code = models.CharField(max_length=20)
    score = models.IntegerField()
    level = models.CharField(max_length=100, null=True)
    semester = models.CharField(max_length=100, null=True)
    moduleName = models.CharField(max_length=100)
    urlSubmit = models.URLField(max_length=200, null=True)
    taskStatus = models.IntegerField(default=0)
