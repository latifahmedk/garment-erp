from django.contrib import admin

from .models import Product, ProductVariant


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "sku",
        "category",
        "selling_price",
        "is_active",
    )

    search_fields = (
        "name",
        "sku",
    )

    list_filter = (
        "category",
        "is_active",
    )
    
    ordering = (
        "name",
    )


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):

    list_display = (
        "product",
        "color",
        "size",
        "variant_sku",
        "stock",
        "selling_price",
        "is_active",
    )

    search_fields = (
        "variant_sku",
        "product__name",
    )

    list_filter = (
        "color",
        "size",
        "is_active",
    )
    
    ordering = (
        "product",
        "color",
        "size",
    )