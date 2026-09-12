from rest_framework import serializers

from .models import (
    SalesOrder,
    SalesOrderItem,
)


class SalesOrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product_variant.product.name",
        read_only=True,
    )

    variant_sku = serializers.CharField(
        source="product_variant.variant_sku",
        read_only=True,
    )

    class Meta:
        model = SalesOrderItem
        fields = "__all__"


class SalesOrderSerializer(serializers.ModelSerializer):

    customer_name = serializers.CharField(
        source="customer.name",
        read_only=True,
    )

    items = SalesOrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = SalesOrder
        fields = "__all__"