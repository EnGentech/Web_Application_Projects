from . import views
from django.urls import path

urlpatterns = [
    path("login/", views.userLogin, name="login"),
    path("singup/", views.signUp, name="signUp"),
    path("questionBank/", views.loadQuestion, name="questions"),
    path("logout/", views.userLogOut, name="logout"),
    path("login/profileUpdate/", views.profileUpdate, name="profileUpdate"),
    path("user/courseWork/", views.courseWork, name="courseWork"),
    path("user/assessment/ajax/", views.assessment, name="assessment"),
    path("user/validateAssessment/ajax/", views.validateAssessment, name="validateAssessment"),
    path("user/submitAssessment/ajax/", views.listSubmittedStudents, name="submitAssessment"),
    path("user/ReturnScores/", views.returnScores, name="returnScores"),
    path("user/generateClassList/", views.generateClassList, name="generateClassList"),
    path("user/taskNotification/", views.taskNotificationMailSent, name="taskNotification"),
    path("user/genReg/<int:regNumber>/", views.generateReferenceNumber, name="genRef"),
    path("user/validateRefNumber/", views.validateReferenceNumber, name="validateRefNumber"),
    path("user/resetPassword/", views.resetPinCode, name="resetPasswordNone"),
    path("user/resetPassword/<str:type>/", views.resetPinCode, name="resetPassword"),
    path("user/take_test/<int:pageNumber>", views.takeTest, name="takeTest"),
    path("user/autoUpdateScore", views.autoScore, name="autoUpdateScore"),
    path("user/defenseReg/", views.submitDefenseReg, name="defenseReg"),
]