from django.contrib import admin

from .models import (
    SalesOrder,
    SalesOrderItem,
)


class SalesOrderItemInline(admin.TabularInline):

    model = SalesOrderItem

    extra = 1


@admin.register(SalesOrder)
class SalesOrderAdmin(admin.ModelAdmin):

    list_display = (
        "order_number",
        "customer",
        "order_date",
        "status",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "order_number",
    )

    ordering = (
        "-created_at",
    )
    
    inlines = [
        SalesOrderItemInline,
    ]