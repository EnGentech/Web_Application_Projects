import json
from .models import AdminUser
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            passCode = form.cleaned_data.get('privilege_passcode')
            if passCode != "admin001_pass$":
                messages.error(request, "Invalid Privilege Passcode")
                return redirect('register')
            user = form.save()
            return redirect('landingPage')
        else:
            print(form.error_messages)
            print(form.fields)
    else:
        print("tested")
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

def authenticate_User(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = AdminUser.objects.filter(username=username).first()
        if user:
            if check_password(password, user.password):
                return JsonResponse({"status_code": 200})
            else:
                return JsonResponse({"status_code": 400})
        else:
            return JsonResponse({"status_code": 401})
    return redirect('landingPage')
