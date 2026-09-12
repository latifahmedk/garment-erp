from django.urls import path

from .views import (
    ProductListCreateAPIView,
    ProductDetailAPIView,
    ProductVariantListCreateAPIView,
    ProductVariantDetailAPIView,
)

urlpatterns = [

    path(
        "",
        ProductListCreateAPIView.as_view(),
        name="product-list-create",
    ),

    path(
        "<int:pk>/",
        ProductDetailAPIView.as_view(),
        name="product-detail",
    ),
    
    path(
        "variants/",
        ProductVariantListCreateAPIView.as_view(),
        name="variant-list-create",
    ),

    path(
        "variants/<int:pk>/",
        ProductVariantDetailAPIView.as_view(),
        name="variant-detail",
    ),

]