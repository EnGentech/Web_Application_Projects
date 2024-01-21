from django.shortcuts import render, redirect
from courses.models  import Courses
from lecturers.models import Upload
from django.contrib import messages

# Create your views here.

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


    return render(request, 'upload.html')

def lecAuth(request):
    """redirect to login"""
    return redirect('signInLec')

def signIn_lec(request):
    """login for lecturers"""
    return render(request, 'signIn.html')
