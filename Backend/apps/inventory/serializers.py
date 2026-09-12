from rest_framework import serializers

from apps.products.models import ProductVariant
from .models import InventoryTransaction


class InventoryTransactionSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product_variant.product.name",
        read_only=True,
    )

    variant_sku = serializers.CharField(
        source="product_variant.variant_sku",
        read_only=True,
    )

    class Meta:
        model = InventoryTransaction
        fields = "__all__"


class InventoryStockSerializer(serializers.ModelSerializer):
    sku = serializers.CharField(source="variant_sku", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    category_name = serializers.CharField(source="product.category.name", read_only=True)
    stock_quantity = serializers.IntegerField(source="stock")

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "sku",
            "variant_sku",
            "product_name",
            "category_name",
            "stock_quantity",
            "cost_price",
            "selling_price",
        ]