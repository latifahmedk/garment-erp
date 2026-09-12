from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import (
    PurchaseOrder,
    PurchaseOrderItem,
)

from .serializers import (
    PurchaseOrderSerializer,
    PurchaseOrderItemSerializer,
)


class PurchaseOrderListCreateAPIView(BaseListCreateAPIView):

    queryset = PurchaseOrder.objects.all()

    serializer_class = PurchaseOrderSerializer

    search_fields = (
        "order_number",
        "supplier__name",
    )

    filterset_fields = (
        "status",
        "supplier",
        "order_date",
    )

    ordering_fields = (
        "created_at",
        "order_date",
        "order_number",
    )


class PurchaseOrderDetailAPIView(BaseDetailAPIView):

    queryset = PurchaseOrder.objects.all()

    serializer_class = PurchaseOrderSerializer


class PurchaseOrderItemListCreateAPIView(BaseListCreateAPIView):

    queryset = PurchaseOrderItem.objects.all()

    serializer_class = PurchaseOrderItemSerializer

    search_fields = (
        "purchase_order__order_number",
        "product_variant__variant_sku",
    )

    filterset_fields = (
        "purchase_order",
        "product_variant",
    )


class PurchaseOrderItemDetailAPIView(BaseDetailAPIView):

    queryset = PurchaseOrderItem.objects.all()

    serializer_class = PurchaseOrderItemSerializer