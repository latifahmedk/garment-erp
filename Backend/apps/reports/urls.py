from django.urls import path

from .views import (
    SalesReportAPIView,
    PurchaseReportAPIView,
    InventoryReportAPIView,
    PaymentReportAPIView,
)

urlpatterns = [

    path(
        "sales/",
        SalesReportAPIView.as_view(),
        name="sales-report",
    ),

    path(
        "purchases/",
        PurchaseReportAPIView.as_view(),
        name="purchase-report",
    ),

    path(
        "inventory/",
        InventoryReportAPIView.as_view(),
        name="inventory-report",
    ),

    path(
        "payments/",
        PaymentReportAPIView.as_view(),
        name="payment-report",
    ),

]