from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . views import MyTokenObtainPairView
urlpatterns = [
    path('home', views.home),
    path('signup/', views.Signup, name='signup'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create_room/', views.create_room, name='create_room'),
    path('enter_to_room/<str:roomName>/', views.enter_to_room, name='enter_to_room'),
]
