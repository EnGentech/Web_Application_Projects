from django.shortcuts import render

# Create your views here.

def landingPage(request):
    return render(request, 'index.html')


def event(request):
    return render(request, 'event.html')

def update(request):
    return render(request, 'update.html')

def delete(request):
    return render(request, 'delete.html')