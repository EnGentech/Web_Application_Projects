from django.shortcuts import render

# Create your views here.

def landingPage(request):
    return render(request, 'index.html')


def event(request):
    return render(request, 'event.html')