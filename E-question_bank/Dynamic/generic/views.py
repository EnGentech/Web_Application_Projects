from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.serializers import serialize
from courses.models import Courses
from student.models import Students_data
from django.contrib.auth.decorators import login_required
from lecturers.models import Upload, Resources, Lecturer
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

@login_required(login_url="login")
def questionAPI(request):
    """API for question"""
    data = []
    allData = Upload.objects.all()
    for content in allData:
       
        obtained = {
            content.courses.faculty : {
            "department": content.courses.department,
            "level": content.courses.level,
            "option": content.courses.option,
            "course_code": content.courses.course_code,
            "course_title": content.courses.course_title,
            "semester": content.semester,
            "year": content.year,
        }
        }
        data.append(obtained)

    return JsonResponse({"data": data})

@login_required(login_url="login")
def resourceAPI(request, department):
    """Return resource API based on faculty"""
    data = []
    allData = Resources.objects.filter(department=department).all()
    for content in allData:
        obtained = {
            "department": content.department,
            "level": content.level,
            "course_code": content.course_code,
            "course_title": content.course_title,
            "semester": content.semester,
            "lectureMaterial": content.lectureMaterial.url,
            "site_recommendation": content.site_recommendation,
            "youtube_channel": content.youtube_channel,
        }
        data.append(obtained)

    return JsonResponse({"data": data})

@login_required(login_url="login")
def filterData(request, dataType, department):
    """filter data based on preference"""
    dataReceived = dataType.split(",")
    resources = []

    def reUse(data):
        """reusable function"""
        for content in data:
            resources.append({
                'course_code': content.course_code,
                'course_title': content.course_title,
                'level': content.level,
                'semester': content.semester,
                'lecture_material': content.lectureMaterial.url,
                'site_recommendation': content.site_recommendation,
                'youtube_channel': content.youtube_channel
            })
        

    if dataReceived[0] == "filter_cCode":
        resourceData = Resources.objects.filter(course_code=dataReceived[1], department=department).first()
        reUse([resourceData])

    elif dataReceived[0] == "filter_level":
        resourceData = Resources.objects.filter(level=dataReceived[1], department=department).all()
        reUse(resourceData)

    elif dataReceived[0] == "filter_semester":
        resourceData = Resources.objects.filter(semester=dataReceived[1], department=department).all()
        reUse(resourceData)

    # return JsonResponse({"data": resources})
    return render(request, "resources.html", {"resources": resources})

def aboutPage(request):
    """about page"""
    if request.user.is_authenticated:
        if isinstance(request.user, Lecturer):
            return render(request, "aboutPage.html", {"staff": True})
    return render(request, "aboutPage.html")

@login_required(login_url="login")
def loadResources(request):
    """load resources"""
    faculty = request.user.faculty
    department = request.user.department
    resources = Resources.objects.filter(faculty=faculty, department=department).all()
    
    return render(request, "resources.html", {"resources": resources, 'faculty': faculty, 'department': department})

    