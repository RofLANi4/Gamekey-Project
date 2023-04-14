from django.db import models
from django.contrib.auth.models import AbstractUser


class Customer(AbstractUser):
    license_number = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.username} ({self.first_name} {self.last_name})"


class Game(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images/")
    genre = models.ManyToManyField("Genre", related_name="games")
    developer = models.ForeignKey("Developer", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Key(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    key = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.key


class Order(models.Model):
    key = models.ForeignKey(Key, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.key}, {self.user}, {self.date}"


class Price(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    price = models.IntegerField()
    discount = models.DecimalField(blank=True, null=True, max_digits=3, decimal_places=2)

    def __str__(self):
        return f"{self.price}"


class Genre(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Developer(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
