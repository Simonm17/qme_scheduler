# Generated by Django 3.1.7 on 2021-03-31 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_requesting_admin',
            field=models.BooleanField(default=False),
        ),
    ]
