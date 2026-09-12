from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import Invoice
from .serializers import InvoiceSerializer
from .services import InvoiceService


class InvoiceListCreateAPIView(BaseListCreateAPIView):

    queryset = Invoice.objects.all()

    serializer_class = InvoiceSerializer

    search_fields = (
        "invoice_number",
        "sales_order__order_number",
        "sales_order__customer__name",
    )

    filterset_fields = (
        "status",
        "invoice_date",
        "due_date",
    )

    ordering_fields = (
        "created_at",
        "invoice_date",
        "invoice_number",
    )

    def perform_create(self, serializer):

        InvoiceService.create_invoice(serializer)


class InvoiceDetailAPIView(BaseDetailAPIView):

    queryset = Invoice.objects.all()

    serializer_class = InvoiceSerializer

    def perform_update(self, serializer):

        InvoiceService.update_invoice(serializer)