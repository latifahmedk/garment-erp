from django.db import transaction

from .models import Payment
from apps.invoices.models import Invoice


class PaymentService:

    @staticmethod
    @transaction.atomic
    def create_payment(serializer):

        payment = serializer.save()

        invoice = payment.invoice

        total_paid = sum(
            p.amount
            for p in invoice.payments.all()
        )

        invoice.paid_amount = total_paid

        if total_paid == 0:

            invoice.status = Invoice.Status.PENDING

        elif total_paid < invoice.total_amount:

            invoice.status = Invoice.Status.PARTIAL

        else:

            invoice.status = Invoice.Status.PAID

        invoice.balance_amount = (
            invoice.total_amount -
            total_paid
        )

        invoice.save()

        return payment