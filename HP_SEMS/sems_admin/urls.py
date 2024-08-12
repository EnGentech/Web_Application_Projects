from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path('auth_validation/', views.authenticate_User, name="authenticate"),
    path('submit_event/', views.submit_event, name="submit_event"),
    path('delete_event/', views.delete_event, name="delete_event"),
]