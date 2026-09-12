from django.db import models

from apps.masters.models import Category, Unit, Fabric, Color, Size


class Product(models.Model):

    name = models.CharField(max_length=200)

    sku = models.CharField(max_length=50, unique=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )

    fabric = models.ForeignKey(
        Fabric,
        on_delete=models.PROTECT,
        related_name="products",
    )

    unit = models.ForeignKey(
        Unit,
        on_delete=models.PROTECT,
        related_name="products",
    )

    description = models.TextField(blank=True)

    cost_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    selling_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name
    
    

class ProductVariant(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants",
    )

    color = models.ForeignKey(
        Color,
        on_delete=models.PROTECT,
    )

    size = models.ForeignKey(
        Size,
        on_delete=models.PROTECT,
    )

    variant_sku = models.CharField(
        max_length=100,
        unique=True,
    )

    barcode = models.CharField(
        max_length=100,
        blank=True,
    )

    cost_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    selling_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    stock = models.PositiveIntegerField(
        default=0,
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
        ordering = ("product", "color", "size", )
        unique_together = ("product", "color", "size")

    def __str__(self):
        return (
            f"{self.product.name} - "
            f"{self.color.name} - "
            f"{self.size.name}"
        )