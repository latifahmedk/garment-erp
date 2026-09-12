from django.urls import path

from .views import (
    ProductionOrderListCreateAPIView,
    ProductionOrderDetailAPIView,
)

urlpatterns = [

    path(
        "orders/",
        ProductionOrderListCreateAPIView.as_view(),
        name="production-order-list-create",
    ),

    path(
        "orders/<int:pk>/",
        ProductionOrderDetailAPIView.as_view(),
        name="production-order-detail",
    ),
]