from django.shortcuts import render, redirect
from django.http import JsonResponse
from courses.models import Courses
from lecturers.models import Upload
from django.http import HttpResponse

# Create your views here.
def index(request):
    """redirect to landing page"""
    return redirect("landingPage")

def landingPage(request):
    """test case of landing page"""
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

def loadResources(request):
    """load resources"""
    return render(request, "resources.html")
    