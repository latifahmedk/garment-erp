from rest_framework import serializers

from .models import Product, ProductVariant


class ProductVariantListSerializer(serializers.ModelSerializer):

    color_name = serializers.CharField(
        source="color.name",
        read_only=True,
    )

    size_name = serializers.CharField(
        source="size.name",
        read_only=True,
    )

    class Meta:
        model = ProductVariant
        fields = (
            "id",
            "variant_sku",
            "color",
            "color_name",
            "size",
            "size_name",
            "stock",
            "selling_price",
            "is_active",
        )
        
        
class ProductSerializer(serializers.ModelSerializer):
    
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    fabric_name = serializers.CharField(
        source="fabric.name",
        read_only=True,
    )

    unit_name = serializers.CharField(
        source="unit.name",
        read_only=True,
    )
    
    variants = ProductVariantListSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Product
        fields = "__all__"

    def validate_sku(self, value):

        value = value.strip().upper()

        queryset = Product.objects.filter(sku__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "SKU already exists."
            )

        return value
    
    
class ProductVariantSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    color_name = serializers.CharField(
        source="color.name",
        read_only=True,
    )

    size_name = serializers.CharField(
        source="size.name",
        read_only=True,
    )

    class Meta:
        model = ProductVariant
        fields = "__all__"

    def validate_variant_sku(self, value):

        value = value.strip().upper()

        queryset = ProductVariant.objects.filter(
            variant_sku__iexact=value
        )

        if self.instance:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Variant SKU already exists."
            )

        return value