from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=32, blank=True)
    last_name = models.CharField(max_length=32, blank=True)
    email = models.EmailField(unique=True)  # Ensure email is unique
    password = models.CharField(max_length=32)
    age = models.IntegerField(default=0)

    def __str__(self):
        return self.email


class Material(models.Model):
    name = models.CharField(max_length=100, unique=True)