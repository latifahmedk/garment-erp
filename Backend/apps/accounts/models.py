from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        PRODUCTION_MANAGER = "PRODUCTION_MANAGER", "Production Manager"
        SALES_MANAGER = "SALES_MANAGER", "Sales Manager"
        RETAIL = "RETAIL", "Retail Customer"
        WHOLESALE = "WHOLESALE", "Wholesale Customer"

    email = models.EmailField(unique=True)

    phone_number = models.CharField(max_length=15, blank=True)

    role = models.CharField(
        max_length=30,
        choices=Role.choices,
        default=Role.RETAIL,
    )

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username