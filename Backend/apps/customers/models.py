from django.db import models


class Customer(models.Model):

    class CustomerType(models.TextChoices):
        RETAIL = "RETAIL", "Retail"
        WHOLESALE = "WHOLESALE", "Wholesale"

    customer_type = models.CharField(
        max_length=20,
        choices=CustomerType.choices,
    )

    name = models.CharField(
        max_length=150,
    )

    phone = models.CharField(
        max_length=15,
        unique=True,
    )

    email = models.EmailField(
        blank=True,
    )

    gst_number = models.CharField(
        max_length=20,
        blank=True,
    )

    address = models.TextField()

    city = models.CharField(
        max_length=100,
    )

    state = models.CharField(
        max_length=100,
    )

    pincode = models.CharField(
        max_length=10,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name