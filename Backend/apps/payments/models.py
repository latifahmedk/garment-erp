from django.db import models

from apps.invoices.models import Invoice


class Payment(models.Model):

    class PaymentMethod(models.TextChoices):

        CASH = "CASH", "Cash"

        UPI = "UPI", "UPI"

        BANK = "BANK", "Bank"

        CARD = "CARD", "Card"

    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.PROTECT,
        related_name="payments",
    )

    payment_date = models.DateField()

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
    )

    reference_number = models.CharField(
        max_length=100,
        blank=True,
    )

    remarks = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:

        ordering = ["-created_at"]

    def __str__(self):

        return f"{self.invoice.invoice_number}"