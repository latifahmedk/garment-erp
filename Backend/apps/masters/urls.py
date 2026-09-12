from django.urls import path

from .views import (
    CategoryListCreateAPIView,
    CategoryDetailAPIView,
    UnitListCreateAPIView,
    UnitDetailAPIView,
    ColorListCreateAPIView,
    ColorDetailAPIView,
    FabricListCreateAPIView,
    FabricDetailAPIView,
    SizeListCreateAPIView,
    SizeDetailAPIView,
)

urlpatterns = [

    path(
        "categories/",
        CategoryListCreateAPIView.as_view(),
        name="category-list-create",
    ),

    path(
        "categories/<int:pk>/",
        CategoryDetailAPIView.as_view(),
        name="category-detail",
    ),
    
    path(
        "units/",
        UnitListCreateAPIView.as_view(),
        name="unit-list-create",
    ),

    path(
        "units/<int:pk>/",
        UnitDetailAPIView.as_view(),
        name="unit-detail",
    ),
    
    path(
        "colors/",
        ColorListCreateAPIView.as_view(),
        name="color-list-create",
    ),

    path(
        "colors/<int:pk>/",
        ColorDetailAPIView.as_view(),
        name="color-detail",
    ),
    
    path(
        "fabrics/",
        FabricListCreateAPIView.as_view(),
        name="fabric-list-create",
    ),

    path(
        "fabrics/<int:pk>/",
        FabricDetailAPIView.as_view(),
        name="fabric-detail",
    ),
    
    path(
        "sizes/",
        SizeListCreateAPIView.as_view(),
        name="size-list-create",
    ),

    path(
        "sizes/<int:pk>/",
        SizeDetailAPIView.as_view(),
        name="size-detail",
    ),
    
]