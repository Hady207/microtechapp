from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.CharField(max_length=100, blank=True,
                             default='https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg')

    def __str__(self):
        return f'{self.user}'


class Item(models.Model):
    productName = models.CharField(max_length=100)
    description = models.TextField()
    image = models.CharField(max_length=100, default='Image Here')
    price = models.IntegerField()
    enquiries = models.ManyToManyField(Customer, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.productName


class Message(models.Model):
    message = models.TextField()
    author = models.ForeignKey(Customer, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.message
