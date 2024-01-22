from django.shortcuts import render, redirect
from django.http import JsonResponse
from courses.models import Courses
from student.models import Students_data
from django.contrib.auth.decorators import login_required
from lecturers.models import Upload, Resources
from django.http import HttpResponse
from django.contrib.auth import logout

# Create your views here.
def index(request):
    """redirect to landing page"""
    return redirect("landingPage")


def landingPage(request):
    """test case of landing page""" 
    if request.user.is_authenticated:
        if isinstance(request.user, Students_data):
            return render(request, "landingPage.html")
        else:
            logout(request)
            return redirect("landingPage")
    else:
        return render(request, "landingPage.html")

def questionAPI(request):
    """API for question"""
    data = []
    allData = Upload.objects.all()
    for content in allData:
       
        obtained = {
            "faculty": content.courses.faculty,
            "department": content.courses.department,
            "level": content.courses.level,
            "option": content.courses.option,
            "course_code": content.courses.course_code,
            "course_title": content.courses.course_title,
            "semester": content.semester,
            "year": content.year,
        }
        data.append(obtained)

    return JsonResponse({"data": data})

def aboutPage(request):
    """about page"""
    return render(request, "aboutPage.html")

@login_required(login_url="login")
def loadResources(request):
    """load resources"""
    faculty = request.user.faculty
    department = request.user.department
    resources = Resources.objects.filter(faculty=faculty, department=department).all()
    
    return render(request, "resources.html", {"resources": resources, 'faculty': faculty, 'department': department})
    