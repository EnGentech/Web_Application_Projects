from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .emailfunction import EmailLogic
from time import sleep

a = False



@shared_task
def send_notification_email(*args, **kwargs):
    email_logic = EmailLogic()
    email_logic.taskNotificationMail(*args, **kwargs)

@shared_task
def basic():
    if a == False:
        return "Not yet time"
    sleep(2)
    return "Basic task completed successfully!"