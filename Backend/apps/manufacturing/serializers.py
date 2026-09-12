from datetime import date
import uuid
from rest_framework import serializers

from apps.products.models import Product, ProductVariant
from apps.masters.models import Color, Size
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

    product = serializers.IntegerField(write_only=True, required=False)
    quantity = serializers.IntegerField(source="planned_quantity", required=False)
    production_date = serializers.DateField(source="start_date", required=False)
    supervisor = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    supervisor_name = serializers.SerializerMethodField()

    production_number = serializers.CharField(required=False, allow_blank=True)
    planned_quantity = serializers.IntegerField(required=False)
    start_date = serializers.DateField(required=False)
    product_variant = serializers.PrimaryKeyRelatedField(
        queryset=ProductVariant.objects.all(), required=False
    )

    class Meta:
        model = ProductionOrder
        fields = "__all__"

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, "copy") else dict(data)
        if "status" in data:
            status_map = {
                "pending": ProductionOrder.Status.PENDING,
                "in progress": ProductionOrder.Status.IN_PROGRESS,
                "completed": ProductionOrder.Status.COMPLETED,
                "cancelled": ProductionOrder.Status.CANCELLED,
            }
            norm = str(data["status"]).lower().strip()
            data["status"] = status_map.get(norm, data["status"])
        return super().to_internal_value(data)

    def get_supervisor_name(self, obj):

        if obj.remarks and "Supervisor: " in obj.remarks:
            return obj.remarks.split("Supervisor: ")[-1].split("\n")[0]
        return "Admin"

    def validate(self, attrs):
        if "status" in attrs:
            status_map = {
                "pending": ProductionOrder.Status.PENDING,
                "in progress": ProductionOrder.Status.IN_PROGRESS,
                "completed": ProductionOrder.Status.COMPLETED,
                "cancelled": ProductionOrder.Status.CANCELLED,
            }
            norm = str(attrs["status"]).lower().strip()
            attrs["status"] = status_map.get(norm, attrs["status"])

        if "planned_quantity" not in attrs:
            attrs["planned_quantity"] = 1

        if "start_date" not in attrs:
            attrs["start_date"] = date.today()

        product_id = attrs.pop("product", None)
        if "product_variant" not in attrs and product_id:
            variant = ProductVariant.objects.filter(product_id=product_id).first()
            if not variant:
                product = Product.objects.get(id=product_id)
                color = Color.objects.first()
                size = Size.objects.first()
                variant = ProductVariant.objects.create(
                    product=product,
                    color=color,
                    size=size,
                    variant_sku=f"{product.sku}-DEF",
                    cost_price=product.cost_price,
                    selling_price=product.selling_price,
                    stock=0,
                )
            attrs["product_variant"] = variant
        elif "product_variant" not in attrs:
            first_variant = ProductVariant.objects.first()
            if first_variant:
                attrs["product_variant"] = first_variant

        if not attrs.get("production_number"):
            attrs["production_number"] = f"MFG-{uuid.uuid4().hex[:8].upper()}"

        supervisor = attrs.pop("supervisor", None)
        if supervisor:
            attrs["remarks"] = f"Supervisor: {supervisor}\n{attrs.get('remarks', '')}".strip()

        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["quantity"] = instance.planned_quantity
        data["production_date"] = str(instance.start_date)
        data["product"] = instance.product_variant.product_id if instance.product_variant else None
        return data