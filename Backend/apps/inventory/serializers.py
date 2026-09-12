from rest_framework import serializers

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