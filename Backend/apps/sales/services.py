from django.db import transaction

from apps.inventory.models import InventoryTransaction

from .models import SalesOrder
from decimal import Decimal

class SalesOrderService:

    @staticmethod
    @transaction.atomic
    def create_order(serializer):

        return serializer.save()

    @staticmethod
    @transaction.atomic
    def update_order(serializer):

        previous_status = serializer.instance.status

        order = serializer.save()
        
        SalesOrderService.calculate_totals(order)

        if (
            previous_status != SalesOrder.Status.DELIVERED
            and order.status == SalesOrder.Status.DELIVERED
        ):

            for item in order.items.all():

                InventoryTransaction.objects.create(
                    product_variant=item.product_variant,
                    transaction_type=InventoryTransaction.TransactionType.SALE,
                    quantity=item.quantity,
                    remarks=f"Sales Order {order.order_number}",
                )

        return order
    
    @staticmethod
    def calculate_totals(order):

        subtotal = Decimal("0.00")

        for item in order.items.all():

            subtotal += (
                item.quantity *
                item.selling_price
            )

        total = subtotal - order.discount + order.tax

        order.subtotal = subtotal

        order.total_amount = total

        order.save()

        return order