from django.contrib.auth.forms import UserCreationForm
from student.models import Students_data
from django import forms

class StudentForm(UserCreationForm):
    """Creating StudentForm class"""
    def __init__(self, *args, **kwargs):
        super(StudentForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'name':'username',
            'placeholder':'Enter Username',
            'id':'username',
        })

        self.fields['email'].widget.attrs.update({
            'name':'email',
            'placeholder':'example@abc.com',
            'id':'email',
        })

        self.fields['faculty'].widget.attrs.update({
            'name':'faculty',
            'id':'faculty',
        })

        self.fields['department'].widget.attrs.update({
            'name':'department',
            'id':'department',
        })

        self.fields['password1'].widget.attrs.update({
            "id": "password",
            "name": "password",
            "placeholder": "********",
        })

        self.fields['password2'].widget.attrs.update({
            "id": "cPassword",
            "name": "cPassword",
            "placeholder": "********",
        })

    class Meta:
        """Meta class"""
        model = Students_data
        fields = [
            "username",
            "email",
            "faculty",
            "department",
            "password1",
            "password2"
            ]
        