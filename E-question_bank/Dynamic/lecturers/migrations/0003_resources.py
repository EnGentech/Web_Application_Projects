# Generated by Django 5.0.1 on 2024-01-21 18:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lecturers', '0002_alter_upload_year'),
    ]

    operations = [
        migrations.CreateModel(
            name='Resources',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('faculty', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('course_code', models.CharField(max_length=100)),
                ('course_title', models.CharField(max_length=100)),
                ('level', models.CharField(max_length=100)),
                ('semester', models.CharField(max_length=100)),
                ('lectureMaterial', models.FileField(upload_to='pdfs/lecture_materials/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])])),
                ('site_recommendation', models.CharField(max_length=255)),
                ('youtube_channel', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
