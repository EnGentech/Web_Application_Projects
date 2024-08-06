from django.urls import path
from . import views

urlpatterns = [
    path("", views.landingPage, name="landingPage"),
    path("public/events", views.event, name="event"),
]