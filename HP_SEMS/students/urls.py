from django.urls import path
from . import views

urlpatterns = [
    path("", views.landingPage, name="landingPage"),
    path("public/events", views.event, name="event"),
    path("public/events/update",views.update, name="update"),
    path("public/events/delete",views.delete, name="delete"),
]