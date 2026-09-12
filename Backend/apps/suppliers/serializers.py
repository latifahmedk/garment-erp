from rest_framework import serializers

from .models import Supplier


class SupplierSerializer(serializers.ModelSerializer):
    contact_person = serializers.CharField(required=False, allow_blank=True, default="")
    address = serializers.CharField(required=False, allow_blank=True, default="")
    city = serializers.CharField(required=False, allow_blank=True, default="")
    state = serializers.CharField(required=False, allow_blank=True, default="")
    pincode = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = Supplier
        fields = "__all__"

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, "copy") else dict(data)
        if "mobile" in data and "phone" not in data:
            data["phone"] = data.get("mobile")
        return super().to_internal_value(data)

    def validate_phone(self, value):
        value = value.strip()
        queryset = Supplier.objects.filter(phone=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value