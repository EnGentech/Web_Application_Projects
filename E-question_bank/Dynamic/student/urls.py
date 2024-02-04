from . import views
from django.urls import path

urlpatterns = [
    path("login/", views.userLogin, name="login"),
    path("singup/", views.signUp, name="signUp"),
    path("questionBank/", views.loadQuestion, name="questions"),
    path("logout/", views.userLogOut, name="logout"),
    path("login/profileUpdate/", views.profileUpdate, name="profileUpdate"),
    path("user/courseWork/", views.courseWork, name="courseWork"),
]