from django.db import transaction

from apps.inventory.models import InventoryTransaction
from apps.inventory.services import InventoryService

from .models import PurchaseOrder
from decimal import Decimal

class PurchaseOrderService:

    @staticmethod
    @transaction.atomic
    def create_order(serializer):

        return serializer.save()

    @staticmethod
    @transaction.atomic
    def update_order(serializer):

        previous_status = serializer.instance.status

        order = serializer.save()
        
        PurchaseOrderService.calculate_totals(order)

        if (
            previous_status != PurchaseOrder.Status.RECEIVED
            and order.status == PurchaseOrder.Status.RECEIVED
        ):

            for item in order.items.all():

                InventoryTransaction.objects.create(
                    product_variant=item.product_variant,
                    transaction_type=InventoryTransaction.TransactionType.PURCHASE,
                    quantity=item.quantity,
                    remarks=f"Purchase Order {order.order_number}",
                )

        return order
    
    @staticmethod
    def calculate_totals(order):

        subtotal = Decimal("0.00")

        for item in order.items.all():

            subtotal += item.quantity * item.unit_price

        total = subtotal - order.discount + order.tax

        order.subtotal = subtotal

        order.total_amount = total

        order.save()

        return order