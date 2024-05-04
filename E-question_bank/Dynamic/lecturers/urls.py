from . import views
from django.urls import path

urlpatterns = [
    path('homePage/', views.staffHomePage, name='homePage'),
    path('upload_question/', views.uploadQuestion, name='upload_question'),
    path('upload_resources/', views.uploadResources, name='upload_resources'),
    path('signIn/', views.signIn_lec, name='signInLec'),
    path("", views.lecAuth),
    path("staffLogout/", views.staffLogout, name="staffLogout"),
    path("scoreBoard/", views.scoreBoard, name="scoreBoard"),
    path("updateScores/", views.scoreActiveStudent, name="updateScores"),
    path("announcement/", views.announcementUpdate, name="announcement"),
]
