from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import StudentForm
from lecturers.models import Upload
from .models import Students_data
from django.contrib import messages
from .backends import StudentBackend
from django import forms
from django.contrib.auth.decorators import login_required
from functools import wraps


def student_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated and isinstance(request.user, Students_data):
            return view_func(request, *args, **kwargs)
        else:
            return redirect('signInLec')  # Redirect to the login page or another page
    return _wrapped_view

# Create your views here.
def logout_required(view_func):
    """Decorator to require the user to be logged out to access a view."""
    def _wrapped_view(request):
        if request.user.is_authenticated and "client" in request.path:
            messages.error(request, f"{request.user} is already Signed in, please Sign Out!")
            return redirect('landing_page') 
        return view_func(request) 
    return _wrapped_view

@logout_required
def userLogin(request):
    """test case of login"""
    if request.method == "POST":
        username = request.POST.get("user")
        password = request.POST.get("password")
        if "heritage_students" in request.path:
            studentAuth = StudentBackend()
            user = studentAuth.authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user, backend="student.backends.StudentBackend")
                messages.success(request, "Login successful")
                return redirect("landingPage")
            else:
                messages.error(request, "Invalid login credentials")
                return render(request, "signIn.html")
    return render(request, "signIn.html")

def signUp(request):
    """test case of logout"""
    if request.method == "POST":
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created successfully, please login")
            return render(request, "landingPage.html")
        else:
            for title, msg in form.errors.items():
                messages.error(request, f"{title}: {msg[0]}")
            return render(request, "signup_page.html", {"form": form})
    else:
        form = StudentForm()
    return render(request, "signup_page.html", {"form": form})

@student_required
@login_required(login_url="login")
def loadQuestion(request):
    """load questions on request"""
    if request.method == "POST":
        level = request.POST.get("level")
        semester = request.POST.get("semester")
        courseCode = request.POST.get("cCode")
        year = request.POST.get("year")
        
        question = Upload.objects.filter(year=year, semester=semester, courses__course_code=courseCode, courses__level=level).first()
        if question:
            messages.success(request, "Question loaded successfully")
            return render(request, "questionPage.html" , {"result": question})
        else:
            messages.error(request, f"Question for {courseCode} not found, check back later!")
            return render(request, "questionPage.html", {"code": courseCode, 'year': year})
    
    return render(request, "questionPage.html")

@student_required
@login_required(login_url="login")
def userLogOut(request):
    """logout user"""
    logout(request)
    messages.success(request, "Logout successful")
    return redirect("login")
