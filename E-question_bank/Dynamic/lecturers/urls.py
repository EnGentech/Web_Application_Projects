from . import views
from django.urls import path

urlpatterns = [
    path('upload_question/', views.uploadQuestion, name='upload_question'),
    path('signIn/', views.signIn_lec, name='signInLec'),
]
