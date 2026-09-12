from django.db import models

from apps.products.models import ProductVariant


class InventoryTransaction(models.Model):

    class TransactionType(models.TextChoices):
        OPENING = "OPENING", "Opening Stock"
        PURCHASE = "PURCHASE", "Purchase"
        PRODUCTION = "PRODUCTION", "Production"
        SALE = "SALE", "Sale"
        RETURN = "RETURN", "Return"
        ADJUSTMENT = "ADJUSTMENT", "Adjustment"

    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="inventory_transactions",
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TransactionType.choices,
    )

    quantity = models.PositiveIntegerField()

    remarks = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return (
            f"{self.product_variant.variant_sku} - "
            f"{self.transaction_type}"
        )