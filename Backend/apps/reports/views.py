from decimal import Decimal

from django.db.models import (
    Sum,
    Count,
    F,
    DecimalField,
    ExpressionWrapper,
)

from rest_framework.views import APIView
from rest_framework.response import Response

from apps.accounts.permissions import IsAdmin

from apps.sales.models import SalesOrder
from apps.purchases.models import PurchaseOrder
from apps.products.models import ProductVariant
from apps.payments.models import Payment


class SalesReportAPIView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        return Response({

            "total_sales": (
                SalesOrder.objects.aggregate(
                    total=Sum("total_amount")
                )["total"]
                or Decimal("0.00")
            ),

            "total_orders": SalesOrder.objects.count(),

            "delivered_orders": SalesOrder.objects.filter(
                status=SalesOrder.Status.DELIVERED
            ).count(),

            "pending_orders": SalesOrder.objects.exclude(
                status=SalesOrder.Status.DELIVERED
            ).count(),

        })


class PurchaseReportAPIView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        return Response({

            "total_purchase": (
                PurchaseOrder.objects.aggregate(
                    total=Sum("total_amount")
                )["total"]
                or Decimal("0.00")
            ),

            "total_orders": PurchaseOrder.objects.count(),

            "received_orders": PurchaseOrder.objects.filter(
                status=PurchaseOrder.Status.RECEIVED
            ).count(),

            "pending_orders": PurchaseOrder.objects.exclude(
                status=PurchaseOrder.Status.RECEIVED
            ).count(),

        })


class InventoryReportAPIView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

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

        total_stock = (
            ProductVariant.objects.aggregate(
                total=Sum("stock")
            )["total"]
            or 0
        )

        low_stock = ProductVariant.objects.filter(
            stock__lte=10
        ).count()

        return Response({

            "inventory_value": inventory_value,

            "total_stock": total_stock,

            "low_stock_products": low_stock,

        })


class PaymentReportAPIView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        return Response({

            "total_collection": (
                Payment.objects.aggregate(
                    total=Sum("amount")
                )["total"]
                or Decimal("0.00")
            ),

            "total_payments": Payment.objects.count(),

        })