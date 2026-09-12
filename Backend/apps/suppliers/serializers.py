from rest_framework import serializers

from .models import Supplier


class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = "__all__"

    def validate_phone(self, value):

        value = value.strip()

        queryset = Supplier.objects.filter(
            phone=value,
        )

        if self.instance:
            queryset = queryset.exclude(
                pk=self.instance.pk,
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Phone number already exists."
            )

        return value