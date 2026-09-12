from django.urls import path

from .views import (
    PurchaseOrderListCreateAPIView,
    PurchaseOrderDetailAPIView,
    PurchaseOrderItemListCreateAPIView,
    PurchaseOrderItemDetailAPIView,
)

urlpatterns = [

    path(
        "",
        PurchaseOrderListCreateAPIView.as_view(),
        name="purchase-order-list-create",
    ),

    path(
        "<int:pk>/",
        PurchaseOrderDetailAPIView.as_view(),
        name="purchase-order-detail",
    ),

    path(
        "items/",
        PurchaseOrderItemListCreateAPIView.as_view(),
        name="purchase-item-list-create",
    ),

    path(
        "items/<int:pk>/",
        PurchaseOrderItemDetailAPIView.as_view(),
        name="purchase-item-detail",
    ),

]