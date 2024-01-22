from django.contrib.auth.backends import ModelBackend
from .models import Lecturer
import re

class StaffBackend(ModelBackend):
    """Use the backend to validate use with email"""

    @staticmethod
    def is_valid_email(email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    def authenticate(self, request, username=None, password=None, **kwargs):
        is_email = self.is_valid_email(username)

        if is_email:
            try:
                user = Lecturer.objects.get(email=username)
            except Lecturer.DoesNotExist:
                return None
        else:
            try:
                user = Lecturer.objects.get(username=username)
            except Lecturer.DoesNotExist:
                return None

        if user.check_password(password):
            return user

    def get_user(self, user_id):
        try:
            return Lecturer.objects.get(pk=user_id)
        except Lecturer.DoesNotExist:
            return None