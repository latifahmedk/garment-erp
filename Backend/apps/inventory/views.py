from rest_framework.exceptions import ValidationError

from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import InventoryTransaction
from .serializers import InventoryTransactionSerializer
from .services import InventoryService


class InventoryTransactionListCreateAPIView(BaseListCreateAPIView):

    queryset = InventoryTransaction.objects.all()

    serializer_class = InventoryTransactionSerializer

    search_fields = (
        "product_variant__variant_sku",
        "product_variant__product__name",
    )

    filterset_fields = (
        "transaction_type",
        "product_variant",
    )

    ordering_fields = (
        "created_at",
    )

    def perform_create(self, serializer):

        try:
            InventoryService.create_transaction(serializer)

        except ValueError as e:
            raise ValidationError(
                {"error": str(e)}
            )


class InventoryTransactionDetailAPIView(BaseDetailAPIView):

    queryset = InventoryTransaction.objects.all()

    serializer_class = InventoryTransactionSerializer

    http_method_names = [
        "get",
    ]