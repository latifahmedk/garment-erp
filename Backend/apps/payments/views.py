from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import Payment
from .serializers import PaymentSerializer
from .services import PaymentService


class PaymentListCreateAPIView(BaseListCreateAPIView):

    queryset = Payment.objects.all()

    serializer_class = PaymentSerializer

    search_fields = (
        "invoice__invoice_number",
        "reference_number",
    )

    filterset_fields = (
        "payment_method",
        "payment_date",
    )

    ordering_fields = (
        "payment_date",
        "created_at",
    )

    def perform_create(self, serializer):

        PaymentService.create_payment(serializer)


class PaymentDetailAPIView(BaseDetailAPIView):

    queryset = Payment.objects.all()

    serializer_class = PaymentSerializer