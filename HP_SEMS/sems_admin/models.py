from django.db import models
from django.contrib.auth.models import AbstractUser


class AdminUser(AbstractUser):
    email = models.EmailField(max_length=100, unique=True)
    privilege_password = models.CharField(max_length=20)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='adminuser_set',  # Change related_name to avoid conflicts
        blank=True,
        help_text='This is admin group with responsibility to manage school events',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='adminuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    REQUIRED_FIELDS = ['email', 'privilege_password']
    

class Event(models.Model):
    """
    This class model is defined for admin management of events
    """
    event_title = models.CharField(max_length=100)
    event_start_date = models.DateTimeField()
    event_end_date = models.DateTimeField()
    event_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    event_admin = models.ForeignKey(AdminUser, related_name='events', on_delete=models.CASCADE)
