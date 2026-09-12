from django.urls import path

from .views import (
    InvoiceListCreateAPIView,
    InvoiceDetailAPIView,
)

urlpatterns = [

    path(
        "",
        InvoiceListCreateAPIView.as_view(),
        name="invoice-list-create",
    ),

    path(
        "<int:pk>/",
        InvoiceDetailAPIView.as_view(),
        name="invoice-detail",
    ),

]