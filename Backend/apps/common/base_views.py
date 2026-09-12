from django.db.models.deletion import ProtectedError
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters, status
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from apps.accounts.permissions import IsAdmin
from .pagination import StandardPagination


class BaseListCreateAPIView(ListCreateAPIView):

    permission_classes = [IsAdmin]

    pagination_class = StandardPagination

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = []

    ordering_fields = "__all__"

    filterset_fields = []


class BaseDetailAPIView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAdmin]

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as e:
            model_names = set(obj.__class__.__name__ for obj in e.protected_objects)
            count = len(e.protected_objects)
            return Response(
                {
                    "detail": (
                        f"Cannot delete this item because it is currently used by "
                        f"{count} {' / '.join(model_names)} record(s). "
                        f"Please reassign or delete the linked record(s) first."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    
    
    
 