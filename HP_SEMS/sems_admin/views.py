import json
from .models import AdminUser, Event
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

def submit_event(request):
    if request.method == "POST":
        title = request.POST.get('event-title')
        start_date = request.POST.get("event-start-date")
        end_date = request.POST.get("event-end-date")
        description = request.POST.get("event-description")

        events = Event.objects.filter(event_title=title).first()
        if events:
            return redirect('event')
        new_event = Event(
            event_title=title,
            event_start_date=start_date,
            event_end_date=end_date,
            event_description=description
        )
        new_event.save()

        return redirect('event')
    return redirect('event')

def delete_event(request):
    if request == 'POST':
        print(True)
        delete_title = request.POST.get('delete-title')
        event = Event.objects.filter(event_title = delete_title).first()
        if event:
            event.delete()
            return redirect('event')
    else:
        print(False)
    return redirect('event')
