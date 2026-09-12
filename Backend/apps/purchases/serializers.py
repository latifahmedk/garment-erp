from django.utils import timezone
from rest_framework import serializers

from apps.products.models import Product, ProductVariant
from apps.masters.models import Color, Size
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
    rate = serializers.DecimalField(
        max_digits=10, decimal_places=2, write_only=True, required=False
    )

    class Meta:
        model = PurchaseOrderItem
        fields = "__all__"
        extra_kwargs = {
            "purchase_order": {"required": False},
            "product_variant": {"required": False},
            "unit_price": {"required": False},
        }


class PurchaseOrderSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(
        source="supplier.name",
        read_only=True,
    )
    items = serializers.ListField(
        child=serializers.DictField(),
        write_only=True,
        required=False,
    )
    order_items = PurchaseOrderItemSerializer(
        source="items",
        many=True,
        read_only=True,
    )

    class Meta:
        model = PurchaseOrder
        fields = "__all__"
        extra_kwargs = {
            "order_number": {"required": False},
            "order_date": {"required": False},
        }

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, "copy") else dict(data)
        if "order_number" not in data or not data["order_number"]:
            if "invoice_no" in data and data["invoice_no"]:
                data["order_number"] = data["invoice_no"]
            else:
                data["order_number"] = f"PO-{timezone.now().strftime('%Y%m%d%H%M%S')}"

        if "order_date" not in data or not data["order_date"]:
            if "purchase_date" in data and data["purchase_date"]:
                data["order_date"] = data["purchase_date"]
            else:
                data["order_date"] = str(timezone.now().date())

        return super().to_internal_value(data)

    def _resolve_product_variant(self, item_data):
        pv_id = item_data.get("product_variant") or item_data.get("product_variant_id")
        if pv_id:
            try:
                return ProductVariant.objects.get(id=pv_id)
            except ProductVariant.DoesNotExist:
                pass

        p_id = item_data.get("product") or item_data.get("product_id")
        if p_id:
            try:
                product = Product.objects.get(id=p_id)
                variant = product.variants.first()
                if not variant:
                    color = Color.objects.first()
                    size = Size.objects.first()
                    variant = ProductVariant.objects.create(
                        product=product,
                        color=color,
                        size=size,
                        variant_sku=f"{product.sku}-STD",
                        cost_price=product.cost_price,
                        selling_price=product.selling_price,
                    )
                return variant
            except Product.DoesNotExist:
                pass

        return ProductVariant.objects.first()

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        total = validated_data.get("total_amount", 0)

        if not total and items_data:
            computed_total = sum(
                float(item.get("quantity", 1)) * float(item.get("rate") or item.get("unit_price") or 0)
                for item in items_data
            )
            validated_data["subtotal"] = computed_total
            validated_data["total_amount"] = computed_total

        order = PurchaseOrder.objects.create(**validated_data)

        for item_data in items_data:
            variant = self._resolve_product_variant(item_data)
            if not variant:
                continue
            qty = int(item_data.get("quantity", 1))
            unit_price = item_data.get("rate") or item_data.get("unit_price") or variant.cost_price or 0

            PurchaseOrderItem.objects.create(
                purchase_order=order,
                product_variant=variant,
                quantity=qty,
                unit_price=unit_price,
            )

        return order

    def update(self, instance, validated_data):
        items_data = validated_data.pop("items", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                variant = self._resolve_product_variant(item_data)
                if not variant:
                    continue
                qty = int(item_data.get("quantity", 1))
                unit_price = item_data.get("rate") or item_data.get("unit_price") or variant.cost_price or 0

                PurchaseOrderItem.objects.create(
                    purchase_order=instance,
                    product_variant=variant,
                    quantity=qty,
                    unit_price=unit_price,
                )

        return instance