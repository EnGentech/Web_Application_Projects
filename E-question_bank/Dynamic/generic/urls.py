from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="index"),
    path("landingPage/", views.landingPage, name="landingPage"),
    path("api/data/", views.questionAPI, name="apiData"),
    path("eQuestion/aboutPage/", views.aboutPage, name="aboutPage"),
    path("learning/resources/", views.loadResources, name="loadResources"),
]
