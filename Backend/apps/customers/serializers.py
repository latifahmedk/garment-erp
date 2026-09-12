from rest_framework import serializers

from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    customer_type = serializers.CharField(required=False, default="RETAIL")
    address = serializers.CharField(required=False, allow_blank=True, default="")
    city = serializers.CharField(required=False, allow_blank=True, default="")
    state = serializers.CharField(required=False, allow_blank=True, default="")
    pincode = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = Customer
        fields = "__all__"

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, "copy") else dict(data)
        if "mobile" in data and "phone" not in data:
            data["phone"] = data.get("mobile")
        if "customer_type" in data and isinstance(data["customer_type"], str):
            data["customer_type"] = data["customer_type"].strip().upper()
        return super().to_internal_value(data)

    def validate_customer_type(self, value):
        val = value.strip().upper() if value else "RETAIL"
        if val not in [Customer.CustomerType.RETAIL, Customer.CustomerType.WHOLESALE]:
            return Customer.CustomerType.RETAIL
        return val

    def validate_phone(self, value):
        value = value.strip()
        queryset = Customer.objects.filter(phone=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value