from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import User
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserManageSerializer,
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "role_name": user.get_role_display(),
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        })


class UserListCreateAPIView(BaseListCreateAPIView):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserManageSerializer
    search_fields = ("username", "email", "first_name", "last_name")
    filterset_fields = ("role", "is_active")
    ordering_fields = ("id", "username", "email", "created_at")


class UserDetailAPIView(BaseDetailAPIView):
    queryset = User.objects.all()
    serializer_class = UserManageSerializer


class RoleListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response([
            {"id": "ADMIN", "name": "Admin"},
            {"id": "PRODUCTION_MANAGER", "name": "Production Manager"},
            {"id": "SALES_MANAGER", "name": "Sales Manager"},
            {"id": "STORE", "name": "Store / Inventory"},
        ])


class EmployeeListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.filter(is_active=True).order_by("username")
        results = [
            {
                "id": u.id,
                "name": f"{u.first_name} {u.last_name}".strip() or u.username,
                "username": u.username,
                "email": u.email,
            }
            for u in users
        ]
        return Response({"results": results, "count": len(results)})