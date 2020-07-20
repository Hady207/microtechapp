from rest_framework import serializers
from .models import Item, Customer, Message
from django.contrib.auth.models import User


class ItemSerializer(serializers.ModelSerializer):
    # enqiures = serializers.StringRelatedField(many=True)

    class Meta:
        model = Item
        fields = ('id', 'productName', 'description', 'image',
                  'price', 'enquiries', 'owner')


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ('user', 'image')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('message', 'author', 'createdAt')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_staff',)
