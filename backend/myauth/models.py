from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']      