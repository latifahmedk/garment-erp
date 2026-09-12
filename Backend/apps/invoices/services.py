from django.db import transaction

from .models import Invoice


class InvoiceService:

    @staticmethod
    @transaction.atomic
    def create_invoice(serializer):
        invoice = serializer.save()
        if invoice.paid_amount == 0 and (invoice.balance_amount is None or invoice.balance_amount == 0):
            invoice.balance_amount = invoice.total_amount
            invoice.save(update_fields=["balance_amount"])
        return invoice


    @staticmethod
    @transaction.atomic
    def update_invoice(serializer):

        invoice = serializer.save()

        if invoice.paid_amount == 0:

            invoice.status = Invoice.Status.PENDING

        elif invoice.paid_amount < invoice.total_amount:

            invoice.status = Invoice.Status.PARTIAL

        else:

            invoice.status = Invoice.Status.PAID

        invoice.balance_amount = max(
        invoice.total_amount - invoice.paid_amount,0,)

        invoice.save()

        return invoice