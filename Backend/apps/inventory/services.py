from django.db import transaction

from .models import InventoryTransaction


class InventoryService:

    @staticmethod
    @transaction.atomic
    def create_transaction(serializer):

        transaction_obj = serializer.save()

        variant = transaction_obj.product_variant

        transaction_type = transaction_obj.transaction_type

        quantity = transaction_obj.quantity

        if transaction_type in [
            InventoryTransaction.TransactionType.OPENING,
            InventoryTransaction.TransactionType.PURCHASE,
            InventoryTransaction.TransactionType.PRODUCTION,
            InventoryTransaction.TransactionType.RETURN,
        ]:

            variant.stock += quantity

        elif transaction_type == InventoryTransaction.TransactionType.SALE:

            if variant.stock < quantity:
                raise ValueError("Insufficient stock available.")

            variant.stock -= quantity

        elif transaction_type == InventoryTransaction.TransactionType.ADJUSTMENT:

            variant.stock = quantity

        variant.save()

        return transaction_obj