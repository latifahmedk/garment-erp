from django.db import transaction

from apps.inventory.models import InventoryTransaction

from .models import ProductionOrder


class ProductionService:

    @staticmethod
    @transaction.atomic
    def create_order(serializer):

        return serializer.save()

    @staticmethod
    @transaction.atomic
    def update_order(serializer):

        previous_status = serializer.instance.status

        order = serializer.save()

        if (
            previous_status != ProductionOrder.Status.COMPLETED
            and order.status == ProductionOrder.Status.COMPLETED
            and order.produced_quantity > 0
        ):

            InventoryTransaction.objects.create(
                product_variant=order.product_variant,
                transaction_type=InventoryTransaction.TransactionType.PRODUCTION,
                quantity=order.produced_quantity,
                remarks=f"Production Order {order.production_number}",
            )

        return order