from django.shortcuts import render, redirect
from courses.models  import Courses
from lecturers.models import Upload, Lecturer, Resources
from student.models import Assessment
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from lecturers.backends import StaffBackend
from django.contrib.auth import logout, login
from functools import wraps
from django.http import HttpResponse
from django.http import JsonResponse
from student.emailfunction import EmailLogic
import json

# Create your views here.

def lecturer_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated and isinstance(request.user, Lecturer):
            return view_func(request, *args, **kwargs)
        else:
            return redirect('signInLec')
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
            existingQuestion = Upload.objects.filter(year=year, semester=semester, courses__faculty=faculty, courses__department=department, courses__course_code=course_code).first()

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
from django.shortcuts import redirect, render
from .models import Resources

@lecturer_required
@login_required(login_url="signInLec")
def uploadResources(request):
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
        status = request.POST.get('status')

        if faculty and department and level and semester and course_code and course_title and file:
            existingResource = Resources.objects.filter(semester=semester, faculty=faculty, department=department, course_code=course_code).first()

            if existingResource:
                if status == "0":
                    messages.error(request, "Resources already uploaded to database, Use Update option")
                    return render(request, 'upload.html')
                elif status == "1":
                    if file:
                        if existingResource.lectureMaterial:
                            existingResource.lectureMaterial.delete()
                    if youtube:
                        if existingResource.youtube_channel:
                            existingResource.youtube_channel.delete()
                    if site:
                        if existingResource.site_recommendation:
                            existingResource.site_recommendation.delete()

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

            if existingResource:
                existingResource.__dict__.update(common_params)
                existingResource.save()
            else:
                loadResource = Resources(**common_params)
                loadResource.save()

            if status == "1":
                messages.success(request, "Resource successfully Updated, Thank you!")
            else:
                messages.success(request, "Resource successfully uploaded to database, Thank you!")

            return render(request, 'upload.html')
        else:
            messages.error(request, "Only option, site and youtube fields are optional")
            return render(request, 'upload.html')

    return render(request, "upload.html")

@lecturer_required
@login_required(login_url="signInLec")
def scoreBoard(request):
    """Score Board update"""
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        courseTitle = request.POST.get('courseTitle')
        courseCode = request.POST.get('courseCode')
        level = request.POST.get('level')
        semester = request.POST.get('semester')
        faculty = request.POST.get('faculty')
        department = request.POST.get('department')
        task = request.POST.get("task")

        data = Assessment.objects.filter(course_code=courseCode, level=level, semester=semester, student__faculty=faculty, student__department=department, moduleName=task).all()
        data_dict = {}
        plagiarismList = {}

        if data:
            try:
                for _ in data:
                    url = _.urlSubmit
                    if url in plagiarismList:
                        plagiarismList[url].append(_.student.regNumber)
                    else:
                        if data.filter(urlSubmit=url).count() > 1:
                            plagiarismList[url] = [_.student.regNumber]

                    if plagiarismList:
                        for key, value in plagiarismList.items():
                            if len(value) > 1:
                                for culprits in value:
                                    user = Assessment.objects.filter(urlSubmit=key, student__regNumber=culprits).first()
                                    user.score = 1
                                    remark = remark = remark = f"VERBATIM PLAGIARISM DETECTED\n\nWe've noticed similarities between your submitted content and other sources, raising concerns of potential plagiarism. Academic integrity is paramount, and plagiarism is strictly prohibited.\n\nWe urge you to address this matter seriously. Misunderstandings can occur, so if you believe there's been an error, please meet with your lecturer or advisor for clarification and support.\n\nMaintaining academic integrity is essential. We trust you'll take the necessary steps to uphold these standards.\n\nThank you!"

                                    user.remark = remark
                                    data = {
                                        "email": user.student.email,
                                        "username": user.student.username,
                                        "score": 1,
                                        "remark": remark
                                    }
                                    email = EmailLogic()
                                    email.scoreNotification(data)
                                    user.save()
            except Exception as e:
                pass

        newData = Assessment.objects.filter(course_code=courseCode, level=level, semester=semester, student__faculty=faculty, student__department=department, moduleName=task).all()
        for i in newData:
            content = {
                i.student.regNumber: {
                    "fullName": i.student.first_name + " " + i.student.last_name,
                    "url": i.urlSubmit,
                    "score": i.score,
                    "remark": i.remark
                }
            }
            data_dict.update(content)

        if newData:
            return JsonResponse({'data': data_dict})
    return render(request, 'scoreBoard.html')

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
                return redirect("homePage")
            else:
                messages.error(request, "Invalid login credentials")
                return render(request, "staffSignIn.html")
    return render(request, 'staffSignIn.html')

def staffHomePage(request):
    """staff home page"""
    return render(request, 'homePage.html')

@lecturer_required
@login_required(login_url="signInLec")
def staffLogout(request):
    """logout staff"""
    logout(request)
    return redirect("signInLec")

@lecturer_required
@login_required(login_url="signInLec")
def scoreActiveStudent(request):
    """Update students record with verified score"""
    if request.method == 'POST':
        taskName = request.POST.get("taskName")
        faculty = request.POST.get('faculty')
        department = request.POST.get("department")
        level = request.POST.get("level")
        semester = request.POST.get("semester")
        coureCode = request.POST.get("cCode")
        regNo = request.POST.get("regNo")
        score = request.POST.get("score")
        remark = request.POST.get("remark")

        user = Assessment.objects.filter(student__regNumber=regNo, course_code=coureCode, level=level, semester=semester,
        student__faculty=faculty, student__department=department,  moduleName=taskName).first()

        if user:
            data = {
                "email": user.student.email,
                "username": user.student.username,
                "score": score,
                "remark": remark
            }
            email = EmailLogic()
            email.scoreNotification(data)

            user.score = score
            user.remark = remark
            user.save()

    return render(request, 'scoreBoard.html')

def announcementUpdate(request):
    if request.method == "POST":
        announcement = request.POST.get("announcement")
        info = {}
        if announcement:
            info.update({"announcement": announcement})
        with open("./generic/announcement.json", "w") as file:
            json.dump(info, file)
            messages.success(request, "Announcement successfully updated")
        return render(request, 'homePage.html')
    with open("./generic/announcement.json", "r") as file:
        data = json.load(file)
    return JsonResponse(data)
