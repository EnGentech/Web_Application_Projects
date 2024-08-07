from django.db import models

class AdminData(models.Model):
    # Information
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)


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
    event_admin = models.ForeignKey(AdminData, related_name='events', on_delete=models.CASCADE)
