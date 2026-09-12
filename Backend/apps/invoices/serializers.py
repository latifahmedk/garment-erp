from rest_framework import serializers

from .models import Invoice


class InvoiceSerializer(serializers.ModelSerializer):

    customer_name = serializers.CharField(
        source="sales_order.customer.name",
        read_only=True,
    )

    order_number = serializers.CharField(
        source="sales_order.order_number",
        read_only=True,
    )

    class Meta:
        model = Invoice
        fields = "__all__"