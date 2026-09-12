from django.db import models

from apps.sales.models import SalesOrder


class Invoice(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        PAID = "PAID", "Paid"
        PARTIAL = "PARTIAL", "Partial"
        CANCELLED = "CANCELLED", "Cancelled"

    invoice_number = models.CharField(
        max_length=30,
        unique=True,
    )

    sales_order = models.OneToOneField(
        SalesOrder,
        on_delete=models.PROTECT,
        related_name="invoice",
    )

    invoice_date = models.DateField()

    due_date = models.DateField()

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    discount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    tax = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    balance_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )
    
    paid_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )

    remarks = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering =  ("-created_at",)

    def __str__(self):
        return self.invoice_number