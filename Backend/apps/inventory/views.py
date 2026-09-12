from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)
from apps.products.models import ProductVariant

from .models import InventoryTransaction
from .serializers import (
    InventoryTransactionSerializer,
    InventoryStockSerializer,
)
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
            raise ValidationError({"error": str(e)})


class InventoryTransactionDetailAPIView(BaseDetailAPIView):
    queryset = InventoryTransaction.objects.all()
    serializer_class = InventoryTransactionSerializer
    http_method_names = ["get"]


class InventoryStockListAPIView(BaseListCreateAPIView):
    queryset = ProductVariant.objects.all().select_related("product", "product__category", "color", "size").order_by("-id")
    serializer_class = InventoryStockSerializer
    search_fields = ("variant_sku", "product__name", "product__category__name")
    ordering_fields = ("id", "variant_sku", "stock")


class InventoryStockUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            variant = ProductVariant.objects.get(pk=pk)
        except ProductVariant.DoesNotExist:
            return Response({"detail": "Variant not found"}, status=404)

        new_stock = request.data.get("stock_quantity")
        if new_stock is None:
            new_stock = request.data.get("stock")
        if new_stock is None:
            return Response({"detail": "stock_quantity is required"}, status=400)

        try:
            new_stock = int(new_stock)
        except ValueError:
            return Response({"detail": "Invalid quantity"}, status=400)

        old_stock = variant.stock
        variant.stock = new_stock
        variant.save(update_fields=["stock"])

        # Record adjustment transaction
        diff = abs(new_stock - old_stock)
        if diff > 0:
            InventoryTransaction.objects.create(
                product_variant=variant,
                transaction_type=InventoryTransaction.TransactionType.ADJUSTMENT,
                quantity=diff,
                remarks=f"Stock adjusted from {old_stock} to {new_stock}",
            )

        serializer = InventoryStockSerializer(variant)
        return Response(serializer.data)


class LowStockAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        low_stock_variants = ProductVariant.objects.filter(stock__lte=10).select_related(
            "product", "product__category"
        )
        serializer = InventoryStockSerializer(low_stock_variants, many=True)
        return Response(serializer.data)


class StockLedgerAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        transactions = InventoryTransaction.objects.filter(
            product_variant_id=pk
        ).order_by("-created_at")
        serializer = InventoryTransactionSerializer(transactions, many=True)
        return Response(serializer.data)