from django.urls import path

from .views import (
    InventoryTransactionListCreateAPIView,
    InventoryTransactionDetailAPIView,
)

urlpatterns = [

    path(
        "transactions/",
        InventoryTransactionListCreateAPIView.as_view(),
        name="inventory-transaction-list-create",
    ),

    path(
        "transactions/<int:pk>/",
        InventoryTransactionDetailAPIView.as_view(),
        name="inventory-transaction-detail",
    ),

]