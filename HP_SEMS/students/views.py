from django.shortcuts import render
from sems_admin.models import Event

# Create your views here.

def landingPage(request):
    return render(request, 'index.html')

def event(request):
    all_events = Event.objects.all()
    return render(request, 'event.html', {'events': all_events})

def adminRegister(request):
    return render(request, 'adminRegister.html')