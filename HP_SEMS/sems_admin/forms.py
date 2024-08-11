# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import AdminUser

class CustomUserCreationForm(UserCreationForm):
    privilege_passcode = forms.CharField(max_length=20, required=True, widget=forms.PasswordInput)

    class Meta:
        model = AdminUser
        fields = ('username', 'password1', 'password2', 'privilege_passcode')
