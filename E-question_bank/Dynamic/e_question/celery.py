# e_question/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'e_question.settings')

app = Celery('e_question')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    # 'notifyActiveTask': {
    #     'task': 'student.tasks.send_notification_email',
    #     'schedule': 5.0 # crontab(minute=0, hour='*'),  # every hour
    # },
    "basic": {
        "task": 'student.tasks.basic',
        "schedule": 5.0
    }
}

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
