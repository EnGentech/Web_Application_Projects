from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import StudentForm
from lecturers.models import Upload, Resources
from .models import Students_data, CourseWork, Assessment
from django.contrib import messages
from .backends import StudentBackend
from django import forms
from django.contrib.auth.decorators import login_required
from functools import wraps
from django.http import Http404, JsonResponse, HttpResponse
import json
from datetime import datetime, timedelta
from .emailfunction import EmailLogic
from lecturers.views import lecturer_required
from random import randint
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.sessions.models import Session
from django.core.paginator import Paginator, EmptyPage


tasks = {
    "CTE323": "assignments/pythonTasks.json",
    "COM122": "assignments/internetTasks.json",
    "EED126": "assignments/entrepreneur.json"
}

def student_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated and isinstance(request.user, Students_data):
            return view_func(request, *args, **kwargs)
        else:
            return redirect('login')
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
            if user is not None and user.is_active == 1:
                login(request, user, backend="student.backends.StudentBackend")
                messages.success(request, "Login successful")
                return redirect("landingPage")
            elif user is not None and user.is_active == 0:
                messages.error(request, "Your account has been disabled")
                return render(request, "signIn.html")
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
            emailAddress = request.POST.get("email")
            userName = request.POST.get("username")
            faculty = request.POST.get("faculty")
            department = request.POST.get("department")

            data = {
                "email": emailAddress,
                "username": userName,
                "faculty": faculty,
                "department": department
            }
            email = EmailLogic()
            email.signUpNotification(data)

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

# @student_required
@login_required(login_url="login")
def profileUpdate(request):
    """update user profile"""
    data = Students_data.objects.filter(username=request.user).first()
    if data.profile_picture:
       return redirect("courseWork")
    if request.method == 'POST':
        ajax_data = request.POST
        selected_courses = json.loads(ajax_data.get('selected_courses'))
        firstName = ajax_data.get("first_name")
        lastName = ajax_data.get("last_name")
        otherName = ajax_data.get("other_name")
        level = ajax_data.get('level')
        semester = ajax_data.get('semester')
        regNo = ajax_data.get("reg_no")
        profile_picture = request.FILES.get('profile_picture')

        data.first_name = firstName
        data.last_name = lastName
        data.otherName = otherName
        data.profile_picture = profile_picture

        if regNo:
            data.regNumber = regNo

        data.save()

        for course in selected_courses:
            courseData = CourseWork(
                level=level,
                semester=semester,
                courseCode=course["code"],
                courseTitle=course["title"],
                student=data
            )
            courseData.save()

        messages.success(request, "Profile updated successfully")
        return JsonResponse({"message": "Profile updated successfully"})

    return render(request, "profileUpdate.html")

def timer(endDate):
    """timer function"""
    end_date = datetime.strptime(endDate, '%d/%m/%Y')
    end_datetime = end_date.replace(hour=16, minute=0, second=0)

    current_datetime = datetime.now()

    if end_datetime <= current_datetime:
        print("End date should be in the future.")
        return

    time_difference = end_datetime - current_datetime

    days = time_difference.days
    hours, remainder = divmod(time_difference.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)

    timePart = [days, hours, minutes, seconds]
    return timePart


@student_required
@login_required(login_url="login")
def courseWork(request):
    """Render user course work"""
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        courseCode = request.POST.get("courseCode")
        try:
            return courseWorkLoad(request, f'student/{tasks[courseCode]}', courseCode)
        except Exception:
            return JsonResponse({"status": "No task"})

    data = Students_data.objects.filter(username=request.user).first()
    registered = CourseWork.objects.filter(student=data).all()
    return render(request, 'courseWork.html', {"data": registered})

@student_required
@login_required(login_url="login")
def courseWorkLoad(request, filePath, courseCode):
    """Load course work data from a file"""
    returnList = []
    scoreObtained = {}
    courseCode = request.POST.get("courseCode")
    data = Students_data.objects.filter(username=request.user).first()
    result = Assessment.objects.filter(course_code=courseCode, student=data).all()
    if result:
        for task in result:
            scoreObtained[task.moduleName] = task.score
    try:
        with open(filePath, "r") as file:
            content = json.load(file)
            for task in content.values():
                if task.get('activation') == 1:
                    for key, value in scoreObtained.items():
                        if key == task['intro']:
                            task['score'] = value
                    returnList.append(task)
    except FileNotFoundError:
        return HttpResponse("File not found", status=404)
    except json.JSONDecodeError:
        return HttpResponse("Invalid JSON content", status=500)

    remainderTimer = timer(task['endDate']) if returnList else None
    data = Students_data.objects.filter(username=request.user).first()
    registered = CourseWork.objects.filter(student=data).all()
    return render(request, 'courseWork.html', {"data": registered, "taskUpdate": returnList, "remainder": remainderTimer})

@student_required
@login_required(login_url="login")
def assessment(request):
    """render Users assessment"""
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        name = request.POST.get("name")
        courseCode = request.POST.get("courseCode")
        moduleNo = request.POST.get("moduleNo")
        moduleTitle = request.POST.get("moduleTitle")
        urlSubmit = request.POST.get("urlSubmit")
        name = name.split()

        email_data = {
            "firstName": request.user.first_name,
            "lastName": request.user.last_name,
            "email": request.user.email,
            "regNo": request.user.regNumber,
            "url": urlSubmit,
            "courseCode": courseCode,
            "moduleNo": moduleNo,
            "moduleTitle": moduleTitle
        }
        email = EmailLogic()
        email.assessmentSubmision(email_data)

        data = Students_data.objects.filter(username=request.user).first()
        courseData = CourseWork.objects.filter(courseCode=courseCode).first()
        level = courseData.level
        semester = courseData.semester

        assessmentData = Assessment(
            student=data,
            course_code=courseCode,
            score=0,
            moduleName=moduleTitle,
            urlSubmit=urlSubmit,
            taskStatus=True,
            level=level,
            semester=semester,
        )
        assessmentData.save()
        return JsonResponse({"message": "Assessment received"})

@student_required
@login_required(login_url="login")
def validateAssessment(request):
    """validate assessment"""
    if request.method == "GET":
        courseCode = request.GET.get("courseCode")
        moduleTitle = request.GET.get("moduleTitle")
        user = Students_data.objects.filter(username=request.user).first()
        taskStatus = Assessment.objects.filter(course_code=courseCode, moduleName=moduleTitle, student=user).first()
        if taskStatus:
            return JsonResponse({"status": taskStatus.taskStatus})
        return JsonResponse({"status": 0})

@lecturer_required
@login_required(login_url="signInLec")
def listSubmittedStudents(request):
    """list submitted students data"""
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        filePath = request.POST.get("filePath")
        dataResponse = []
        with open(f"student/{filePath}", "r") as file:
            content = json.load(file)
        for key, value in content.items():
            dataResponse.append(value["intro"])

        return JsonResponse({"dataResponse": dataResponse})

@lecturer_required
@login_required(login_url="signInLec")
def returnScores(request):
    """return User Grade to user"""
    if request.method == "POST" and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        courseCode = request.POST.get("cCode")
        faculty = request.POST.get("faculty")
        department = request.POST.get("department")
        semester = request.POST.get("semester")
        level = request.POST.get("level")
        users = Students_data.objects.filter(faculty=faculty, department=department).all()

        averageTime = 0
        try:
            with open(f'student/{tasks[courseCode]}', "r") as file:
                content = json.load(file)
                for task in content.values():
                    averageTime += 1
        except Exception:
            return JsonResponse({"response": "No Score for this course yet!", "status": 501})
        if averageTime > 0:
            returnData = []
            for user in users:
                total = 0
                result = Assessment.objects.filter(course_code=courseCode, student=user, level=level, semester=semester).all()
                if result:
                    for response in result:
                        total += int(response.score)
                        averageScore = round(total / averageTime, 2)
                        assessmentScore = (averageScore / 100) * 30
                    user_data = {
                        "fullName": user.first_name + " " + user.last_name,
                        "totalScore": round(assessmentScore, 2),
                        "regNumber": user.regNumber
                    }
                    returnData.append(user_data)
            return JsonResponse({"response": returnData})

@lecturer_required
@login_required(login_url="signInLec")
def generateClassList(request):
    """generate Class list"""
    regList = []
    if request.method == "POST":
        faculty = request.POST.get("faculty")
        department = request.POST.get("department")
        reglist = Students_data.objects.filter(department=department, faculty=faculty).all()
        for reg in reglist:
            if reg.regNumber:
                regList.append(reg.regNumber)
    return JsonResponse({"regList": regList})

@lecturer_required
@login_required(login_url="signInLec")
def generateReferenceNumber(request, regNumber):
    """Generate reference Number for the user"""
    user = Students_data.objects.filter(regNumber=regNumber).first()
    refNumber = user.refNumber
    if refNumber:
        return JsonResponse({"ref": refNumber})
    else:
        refNumber = randint(2000000000, 2999999999)
        user.refNumber = refNumber
        emailAddress = user.email
        userName = user.username
        refNumb = refNumber
        data = {
                "email": emailAddress,
                "username": userName,
                "ref": refNumb,
            }
        user.save()
        mailme = EmailLogic()
        mailme.refID(data)
        return JsonResponse({'ref': refNumber})

def taskNotificationMailSent(request):
    """send task notification mail"""
    email = EmailLogic()
    email.taskNotificationMail()
    return JsonResponse({"message": "Notification sent successfully"})

@student_required
@login_required(login_url="login")
def validateReferenceNumber(request):
    """validate user reference Number"""
    if request.method == "POST":
        refNumber = request.POST.get("reference_number")
        courseCode = request.POST.get("course_code")
        user = request.user
        userRef = Students_data.objects.filter(username=user, refNumber=refNumber).first()
        if userRef:
            material = Resources.objects.filter(course_code=courseCode).first()
            return JsonResponse({"status": 1, "material": material.lectureMaterial.url})
    return JsonResponse({"status": 0})

def resetPinCode(request, type=None):
    if request.method == "GET":
        email = request.GET.get("email")
        user = Students_data.objects.filter(email=email).first()
        if user:
            resetCode = randint(100000, 999999)
            request.session['resetCode'] = resetCode
            request.session['email'] = email
            request.session.set_expiry(180)

            emailData = {
                "email": email,
                "username": user.username,
                "resetCode": resetCode
            }
            email_ = EmailLogic()
            email_.passwordReset(emailData)
            return JsonResponse({"message": "Pin code reset successful"})
        else:
            return JsonResponse({"message": "Not Found"})

    elif request.method == 'POST' and type == "reset":
        resetCode = request.session.get('resetCode')
        email = request.session.get('email')

        new_password = request.POST.get("resetPassword")
        confirm_password = request.POST.get("resetPassword2")
        if new_password != confirm_password:
            return JsonResponse({"message": "Passwords do not match"}, status=400)
        try:
            validate_password(new_password)
            user = Students_data.objects.filter(email=email).first()
            if user:
                user.set_password(new_password)
                user.save()
                messages.success(request, "Password reset successful")
                return render(request, "signIn.html")
            else:
                return JsonResponse({"message": "User not found"})
        except ValidationError as e:
            return JsonResponse({"message": e.messages[0]}, status=400)

    elif request.method == "POST":
        resetCode = request.session.get('resetCode')
        requestCode = request.POST.get("resetCode")
        if int(requestCode) == int(resetCode):
            return JsonResponse({"status": "1"})
        else:
            return JsonResponse({"status": "0"})

@student_required
@login_required(login_url="login")
def takeTest(request, pageNumber=1):
    courseCode = request.GET.get("courseCode")
    courseTitle = request.GET.get("courseTitle")
    moduleTitle = request.GET.get("moduleTitle")
    regNumber = request.GET.get("regNumber")

    duration = 30
    markScheme = {}

    pickedQuestion = request.session.get('pickedQuestion', [])
    request.session.set_expiry((duration + 5) * 60)

    if request.method == "POST":
        data = request.body.decode('utf-8')
        quiz_data = json.loads(data).get("quiz")

        for x in pickedQuestion:
            markScheme[x["questionID"]] = x["answer"]

        score = 0

        for key, value in quiz_data.items():
            if str(key) in str(markScheme) and value == markScheme[int(key)]:
                score += (100 / 30)
        return JsonResponse({"score": round(score, 2)})

    if not pickedQuestion:
        with open(f"student/quiz/{courseCode}.json", "r") as file:
            content = json.load(file)
            questions = content.get("questions")

        length = len(questions)
        picks = []
        for _ in range(0, length - 1):
            while True:
                pick = randint(150, 181)
                if pick in picks:
                    continue
                else:
                    picks.append(pick)
                    break

        for pick in picks:
            pickedQuestion.append(questions[pick])

        request.session['pickedQuestion'] = pickedQuestion

    paginator = Paginator(pickedQuestion, 6)
    try:
        page_obj = paginator.page(pageNumber)
    except EmptyPage:
        raise Http404("No questions available")

    totalPages = paginator.num_pages
    count = paginator.page_range.index(pageNumber) + 1

    checkSubmition = Assessment.objects.filter(course_code=courseCode, student=request.user, moduleName=moduleTitle).first()
    if checkSubmition:
        status = checkSubmition.taskStatus
        if status:
            messages.error(request, "You have already taken this test")
            data = Students_data.objects.filter(username=request.user).first()
            registered = CourseWork.objects.filter(student=data).all()
            return render(request, 'courseWork.html', {"data": registered})

    activate = Assessment.objects.filter(course_code=courseCode, student=request.user, moduleName=moduleTitle).first()
    if not activate:
        user = Students_data.objects.filter(username=request.user, regNumber=regNumber).first()
        courseData = CourseWork.objects.filter(courseCode=courseCode).first()
        if courseData:
            level = courseData.level
            semester = courseData.semester
            assessmentData = Assessment(
                student=user,
                course_code=courseCode,
                score=0,
                moduleName=moduleTitle,
                taskStatus=True,
                level=level,
                semester=semester,
            )
            # assessmentData.save()
    return render(request, "testPage.html", {"quiz": page_obj, "totalPages": totalPages, "pageCount": count, "duration": duration, "courseCode": courseCode, "courseTitle": courseTitle, "moduleTitle": moduleTitle})

@student_required
@login_required(login_url="login")
def autoScore(request):
    """Update score automatically based on test passed"""
    if request.method == "POST":
        obtainedScore = request.POST.get("obtainedScore")
        courseCode = request.POST.get("cCode")
        moduleTitle = request.POST.get("moduleTitle")
        updateScore = Assessment.objects.filter(course_code=courseCode, student=request.user, moduleName=moduleTitle).first()
        updateScore.score = round(float(obtainedScore))
        updateScore.remark = "Test completed and score uploaded successfully"
        #updateScore.save()
        return JsonResponse({"score":"success"})
