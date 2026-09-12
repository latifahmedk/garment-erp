from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import Customer
from .serializers import CustomerSerializer


class CustomerListCreateAPIView(BaseListCreateAPIView):

    queryset = Customer.objects.all()

    serializer_class = CustomerSerializer

    search_fields = (
        "name",
        "phone",
        "email",
        "city",
    )

    filterset_fields = (
        "customer_type",
        "is_active",
        "city",
        "state",
    )

    ordering_fields = (
        "name",
        "created_at",
    )


class CustomerDetailAPIView(BaseDetailAPIView):

    queryset = Customer.objects.all()

    serializer_class = CustomerSerializer