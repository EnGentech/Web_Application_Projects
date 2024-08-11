from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path('auth_validation/', views.authenticate_User, name="authenticate"),
]