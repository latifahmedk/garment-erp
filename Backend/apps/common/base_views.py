from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters
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
    
    
    
 