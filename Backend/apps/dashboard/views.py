from decimal import Decimal

from django.db.models import (
    Sum,
    F,
    DecimalField,
    ExpressionWrapper,
)

from rest_framework.views import APIView
from rest_framework.response import Response

from apps.accounts.permissions import IsAdmin

from apps.customers.models import Customer
from apps.suppliers.models import Supplier
from apps.products.models import (
    Product,
    ProductVariant,
)
from apps.purchases.models import PurchaseOrder
from apps.sales.models import SalesOrder
from apps.invoices.models import Invoice
from apps.payments.models import Payment


class DashboardAPIView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        total_sales = (
            SalesOrder.objects.aggregate(
                total=Sum("total_amount")
            )["total"]
            or Decimal("0.00")
        )

        total_purchase = (
            PurchaseOrder.objects.aggregate(
                total=Sum("total_amount")
            )["total"]
            or Decimal("0.00")
        )

        total_collection = (
            Payment.objects.aggregate(
                total=Sum("amount")
            )["total"]
            or Decimal("0.00")
        )

        outstanding_amount = (
            Invoice.objects.aggregate(
                total=Sum("balance_amount")
            )["total"]
            or Decimal("0.00")
        )

        inventory_value = (
            ProductVariant.objects.aggregate(
                total=Sum(
                    ExpressionWrapper(
                        F("stock") * F("cost_price"),
                        output_field=DecimalField(
                            max_digits=18,
                            decimal_places=2,
                        ),
                    )
                )
            )["total"]
            or Decimal("0.00")
        )

        return Response({

            "total_customers": Customer.objects.count(),

            "total_suppliers": Supplier.objects.count(),

            "total_products": Product.objects.count(),

            "total_variants": ProductVariant.objects.count(),

            "purchase_orders": PurchaseOrder.objects.count(),

            "sales_orders": SalesOrder.objects.count(),

            "invoices": Invoice.objects.count(),

            "total_sales": total_sales,

            "total_purchase": total_purchase,

            "total_collection": total_collection,

            "outstanding_amount": outstanding_amount,

            "inventory_value": inventory_value,

        })