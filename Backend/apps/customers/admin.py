from django.contrib import admin

from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "customer_type",
        "phone",
        "city",
        "is_active",
    )

    search_fields = (
        "name",
        "phone",
        "email",
    )

    list_filter = (
        "customer_type",
        "is_active",
    )