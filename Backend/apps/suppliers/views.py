from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import Supplier
from .serializers import SupplierSerializer


class SupplierListCreateAPIView(BaseListCreateAPIView):

    queryset = Supplier.objects.all()

    serializer_class = SupplierSerializer

    search_fields = (
        "name",
        "contact_person",
        "phone",
        "email",
        "city",
    )

    filterset_fields = (
        "is_active",
        "city",
        "state",
    )

    ordering_fields = (
        "name",
        "created_at",
    )


class SupplierDetailAPIView(BaseDetailAPIView):

    queryset = Supplier.objects.all()

    serializer_class = SupplierSerializer