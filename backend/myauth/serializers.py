from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Todo

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password',]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user        
    
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','title',]  # Include necessary fields
        read_only_fields = ['user', 'created_at']  # Prevent modification of user and created_at fields

