from django.contrib import admin
from .models import Customer, Item, Message
# Register your models here.


admin.site.register(Customer)
admin.site.register(Item)
admin.site.register(Message)
