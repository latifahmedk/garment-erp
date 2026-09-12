from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import ProductionOrder
from .serializers import ProductionOrderSerializer
from .services import ProductionService


class ProductionOrderListCreateAPIView(BaseListCreateAPIView):

    queryset = ProductionOrder.objects.all()

    serializer_class = ProductionOrderSerializer

    search_fields = (
        "production_number",
        "product_variant__variant_sku",
        "product_variant__product__name",
    )

    filterset_fields = (
        "status",
        "product_variant",
        "start_date",
    )

    ordering_fields = (
        "created_at",
        "start_date",
        "production_number",
    )

    def perform_create(self, serializer):

        ProductionService.create_order(serializer)


class ProductionOrderDetailAPIView(BaseDetailAPIView):

    queryset = ProductionOrder.objects.all()

    serializer_class = ProductionOrderSerializer

    def perform_update(self, serializer):

        ProductionService.update_order(serializer)