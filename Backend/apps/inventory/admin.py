from django.contrib import admin

from .models import InventoryTransaction


@admin.register(InventoryTransaction)
class InventoryTransactionAdmin(admin.ModelAdmin):

    list_display = (
        "product_variant",
        "transaction_type",
        "quantity",
        "created_at",
    )

    list_filter = (
        "transaction_type",
    )

    search_fields = (
        "product_variant__variant_sku",
    )
    
    ordering = (
        "-created_at",
    )