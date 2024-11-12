from django.urls import path 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('api/register/', RegisterView.as_view(), name='')
]


urlpatterns += [
    path('api/create/', TodoCreate.as_view(), name='CreateTodo'),
    path('api/todos/', TodoList.as_view(), name='ListTodos'), 
    path('api/delete/<int:pk>/', TodoDelete.as_view(), name='DeleteTodo'),
]