# Generated by Django 5.0.7 on 2024-08-11 22:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sems_admin', '0003_alter_adminuser_options_alter_adminuser_managers_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='event_admin',
        ),
    ]
