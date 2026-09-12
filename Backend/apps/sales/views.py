from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import (
    SalesOrder,
    SalesOrderItem,
)

from .serializers import (
    SalesOrderSerializer,
    SalesOrderItemSerializer,
)

from .services import SalesOrderService


class SalesOrderListCreateAPIView(BaseListCreateAPIView):

    queryset = SalesOrder.objects.all()

    serializer_class = SalesOrderSerializer

    search_fields = (
        "order_number",
        "customer__name",
    )

    filterset_fields = (
        "status",
        "customer",
        "order_date",
    )

    ordering_fields = (
        "created_at",
        "order_date",
        "order_number",
    )

    def perform_create(self, serializer):

        SalesOrderService.create_order(serializer)


class SalesOrderDetailAPIView(BaseDetailAPIView):

    queryset = SalesOrder.objects.all()

    serializer_class = SalesOrderSerializer

    def perform_update(self, serializer):

        SalesOrderService.update_order(serializer)


class SalesOrderItemListCreateAPIView(BaseListCreateAPIView):

    queryset = SalesOrderItem.objects.all()

    serializer_class = SalesOrderItemSerializer

    search_fields = (
        "sales_order__order_number",
        "product_variant__variant_sku",
    )

    filterset_fields = (
        "sales_order",
        "product_variant",
    )


class SalesOrderItemDetailAPIView(BaseDetailAPIView):

    queryset = SalesOrderItem.objects.all()

    serializer_class = SalesOrderItemSerializer