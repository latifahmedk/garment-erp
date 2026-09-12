from rest_framework import serializers

from .models import ProductionOrder


class ProductionOrderSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product_variant.product.name",
        read_only=True,
    )

    variant_sku = serializers.CharField(
        source="product_variant.variant_sku",
        read_only=True,
    )

    color_name = serializers.CharField(
        source="product_variant.color.name",
        read_only=True,
    )

    size_name = serializers.CharField(
        source="product_variant.size.name",
        read_only=True,
    )

    class Meta:
        model = ProductionOrder
        fields = "__all__"