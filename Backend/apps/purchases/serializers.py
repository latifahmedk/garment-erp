from rest_framework import serializers

from .models import (
    PurchaseOrder,
    PurchaseOrderItem,
)


class PurchaseOrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product_variant.product.name",
        read_only=True,
    )

    variant_sku = serializers.CharField(
        source="product_variant.variant_sku",
        read_only=True,
    )

    class Meta:
        model = PurchaseOrderItem
        fields = "__all__"


class PurchaseOrderSerializer(serializers.ModelSerializer):

    supplier_name = serializers.CharField(
        source="supplier.name",
        read_only=True,
    )

    items = PurchaseOrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = PurchaseOrder
        fields = "__all__"