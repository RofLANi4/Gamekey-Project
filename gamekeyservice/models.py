from django.db import models
from django.contrib.auth.models import AbstractUser


class Customer(AbstractUser):

    def __str__(self):
        return f"{self.username}"


class Game(models.Model):
    name = models.CharField(max_length=255, unique=True)
    price = models.IntegerField()
    discount = models.IntegerField()
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images/")
    genre = models.ManyToManyField("Genre", related_name="games")
    developer = models.ForeignKey("Developer", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Key(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    key = models.CharField(max_length=255)

    def __str__(self):
        return self.key


class Order(models.Model):
    key = models.ForeignKey(Key, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.key}, {self.user}, {self.date}"


class Genre(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Developer(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
