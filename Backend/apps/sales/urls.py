from django.urls import path

from .views import (
    SalesOrderListCreateAPIView,
    SalesOrderDetailAPIView,
    SalesOrderItemListCreateAPIView,
    SalesOrderItemDetailAPIView,
)

urlpatterns = [

    path(
        "",
        SalesOrderListCreateAPIView.as_view(),
        name="sales-order-list-create",
    ),

    path(
        "<int:pk>/",
        SalesOrderDetailAPIView.as_view(),
        name="sales-order-detail",
    ),

    path(
        "items/",
        SalesOrderItemListCreateAPIView.as_view(),
        name="sales-item-list-create",
    ),

    path(
        "items/<int:pk>/",
        SalesOrderItemDetailAPIView.as_view(),
        name="sales-item-detail",
    ),
]