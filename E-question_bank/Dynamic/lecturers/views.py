from django.shortcuts import render, redirect
from courses.models  import Courses
from lecturers.models import Upload, Lecturer, Resources
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from lecturers.backends import StaffBackend
from django.contrib.auth import logout, login
from functools import wraps
from django.http import HttpResponse

# Create your views here.

def lecturer_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated and isinstance(request.user, Lecturer):
            return view_func(request, *args, **kwargs)
        else:
            return redirect('signInLec')  # Redirect to the login page or another page
    return _wrapped_view

@lecturer_required
@login_required(login_url="signInLec")
def uploadQuestion(request):
    """upload question to database"""
    if request.method == "POST":
        # get question from Lecturer
        faculty = request.POST.get('faculty')
        department = request.POST.get('department')
        level = request.POST.get('level')
        option = request.POST.get('option')
        year = request.POST.get('year')
        semester = request.POST.get('semester')
        course_code = request.POST.get('cCode')
        course_title = request.POST.get('cTitle')
        file = request.FILES.get('upload')

        if faculty and department and level and year and semester and course_code and course_title and file:
            existingQuestion = Upload.objects.filter(year=year, semester=semester, courses__faculty=faculty, courses__department=department).first()
            
            if existingQuestion:
                messages.error(request, "Question already uploaded to database")
                return render(request, 'upload.html')

            if faculty:  
                newEntry = Courses(
                    faculty=faculty,
                    department=department,
                    level=level,
                    option=option,
                    course_code=course_code,
                    course_title=course_title,
                    )
                newEntry.save()

                # courseUpload = Courses.objects.filter(faculty=faculty, department=department, level=level).first()
                loadQuestion = Upload(
                    year=year,
                    semester=semester,
                    pdf_file=file,
                    courses=newEntry,
                    )
                loadQuestion.save()
                messages.success(request, "Questions successfull uploaded to database, Thank you!")
            
                return render(request, 'upload.html')
        else:
            messages.error(request, "Please fill all fields, option field is optional")
            return render(request, 'upload.html')

    return render(request, 'upload.html')

@lecturer_required
@login_required(login_url="signInLec")
def uploadResources(request):
    """Upload Resources to database"""
    if not request.user.is_authenticated:
        return redirect("signInLec")
    if request.method == "POST":
        faculty = request.POST.get('faculty')
        department = request.POST.get('department')
        level = request.POST.get('level')
        semester = request.POST.get('semester')
        course_code = request.POST.get('cCode')
        course_title = request.POST.get('cTitle')
        file = request.FILES.get('upload')
        site = request.POST.get('site')
        youtube = request.POST.get('youtube')

        if faculty and department and level and semester and course_code and course_title and file:
            existingResource = Resources.objects.filter(semester=semester, faculty=faculty, department=department, course_code=course_code).first()
            
            if existingResource:
                messages.error(request, "Resources already uploaded to database")
                return render(request, 'upload.html')

            common_params = {
                'faculty': faculty,
                'department': department,
                'level': level,
                'semester': semester,
                'course_code': course_code,
                'course_title': course_title,
                'lectureMaterial': file,
            }

            if youtube and site:
                common_params['site_recommendation'] = site
                common_params['youtube_channel'] = youtube
            elif youtube:
                common_params['youtube_channel'] = youtube
            elif site:
                common_params['site_recommendation'] = site

            loadResource = Resources(**common_params)
            loadResource.save()

            messages.success(request, "Resources successfull uploaded to database, Thank you!")
        
            return render(request, 'upload.html')
        else:
            messages.error(request, "Only option, site and youtube fields are optional")
            return render(request, 'upload.html')

    return render(request, "upload.html")

@lecturer_required
@login_required(login_url="signInLec")
def uploadAnswers(request):
    """Upload answers to database"""
    return HttpResponse("Coming soon, please be patience")

def lecAuth(request):
    """redirect to login"""
    return redirect('signInLec')

def signIn_lec(request):
    """login for lecturers"""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get("password")
        if "staff" in request.path:
            staffAuth = StaffBackend()
            user = staffAuth.authenticate(request, username=username, password=password)
    
            if user is not None:
                login(request, user, backend='lecturers.backends.StaffBackend')
                messages.success(request, "Login successful")
                return redirect("upload_question")
            else:
                messages.error(request, "Invalid login credentials")
                return render(request, "staffSignIn.html")
    return render(request, 'staffSignIn.html')

@lecturer_required
@login_required(login_url="signInLec")
def staffLogout(request):
    """logout staff"""
    logout(request)
    return redirect("signInLec")
