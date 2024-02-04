from django.contrib import admin
from .models import Students_data, Transaction, CourseWork

# Register your models here.
admin.site.register(Students_data)
admin.site.register(Transaction)
admin.site.register(CourseWork)