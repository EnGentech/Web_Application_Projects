from django.contrib import admin
from .models import AdminUser, Event

admin.site.register(AdminUser)
admin.site.register(Event)
