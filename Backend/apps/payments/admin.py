from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = (
        "invoice",
        "payment_date",
        "amount",
        "payment_method",
    )

    list_filter = (
        "payment_method",
    )

    search_fields = (
        "reference_number",
    )