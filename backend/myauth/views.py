from .serializers import  UserRegisterSerializer, TodoSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Todo

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]
    serializer_class = UserRegisterSerializer  



class TodoList(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer
    
    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user).order_by('-id')


class TodoCreate(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer

    def perform_create(self, serializer):
        # Ensure that the user is set when creating a blog post
        serializer.save(user=self.request.user)

class TodoDelete(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer  

    def get_queryset(self):
        # Only allow users to access their own blogs
        return Todo.objects.filter(user=self.request.user).order_by('-id')
