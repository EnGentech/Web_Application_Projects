from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="index"),
    path("landingPage/", views.landingPage, name="landingPage"),
    path("api/data/questions", views.questionAPI, name="apiData"),
    path("api/data/resources/<str:faculty>/", views.resourceAPI, name="resourceAPI"),
    path("eQuestion/aboutPage/", views.aboutPage, name="aboutPage"),
    path("learning/resources/", views.loadResources, name="loadResources"),
    path("learning/resources/<str:dataType>/<str:faculty>/", views.filterData, name="filterData"),
]
