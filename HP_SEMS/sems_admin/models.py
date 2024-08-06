from django.db import models

# Create your models here.

class Admin_data(models.Model):
    # information 
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100,unique=True)

class new(test):
    pass