from django.contrib import admin

from .models import ProductionOrder


@admin.register(ProductionOrder)
class ProductionOrderAdmin(admin.ModelAdmin):

    list_display = (
        "production_number",
        "product_variant",
        "planned_quantity",
        "produced_quantity",
        "status",
    )

    search_fields = (
        "production_number",
    )

    list_filter = (
        "status",
    )
    
    ordering = (
        "-created_at",
    )