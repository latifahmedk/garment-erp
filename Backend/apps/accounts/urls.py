from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CurrentUserView,
    UserListCreateAPIView,
    UserDetailAPIView,
    RoleListAPIView,
    EmployeeListAPIView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("me/", CurrentUserView.as_view(), name="me"),
    path("profile/", CurrentUserView.as_view(), name="profile"),
]