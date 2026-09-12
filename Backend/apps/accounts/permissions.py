from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Allows access to Admin, staff/superusers, or internal management roles.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.is_superuser or request.user.is_staff:
            return True
        return request.user.role in [
            "ADMIN",
            "PRODUCTION_MANAGER",
            "SALES_MANAGER",
        ]