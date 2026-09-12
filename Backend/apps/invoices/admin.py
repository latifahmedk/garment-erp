from django.contrib import admin

from .models import Invoice


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):

    list_display = (
        "invoice_number",
        "sales_order",
        "invoice_date",
        "total_amount",
        "paid_amount",
        "status",
    )

    search_fields = (
        "invoice_number",
    )

    list_filter = (
        "status",
    )
    
    ordering = (
        "-created_at",
    )