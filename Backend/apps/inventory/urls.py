from django.urls import path

from .views import (
    InventoryStockListAPIView,
    InventoryStockUpdateAPIView,
    LowStockAPIView,
    StockLedgerAPIView,
    InventoryTransactionListCreateAPIView,
    InventoryTransactionDetailAPIView,
)

urlpatterns = [
    path(
        "",
        InventoryStockListAPIView.as_view(),
        name="inventory-stock-list",
    ),
    path(
        "<int:pk>/",
        InventoryStockUpdateAPIView.as_view(),
        name="inventory-stock-update",
    ),
    path(
        "low-stock/",
        LowStockAPIView.as_view(),
        name="inventory-low-stock",
    ),
    path(
        "<int:pk>/ledger/",
        StockLedgerAPIView.as_view(),
        name="inventory-stock-ledger",
    ),
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