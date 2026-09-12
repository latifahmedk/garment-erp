from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import (
    Product,
    ProductVariant,
)

from .serializers import (
    ProductSerializer,
    ProductVariantSerializer,
)


class ProductListCreateAPIView(BaseListCreateAPIView):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    search_fields = (
        "name",
        "sku",
        "category__name",
    )

    filterset_fields = (
        "category",
        "fabric",
        "unit",
        "is_active",
    )

    ordering_fields = (
        "name",
        "sku",
        "selling_price",
        "created_at",
    )


class ProductDetailAPIView(BaseDetailAPIView):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer


class ProductVariantListCreateAPIView(BaseListCreateAPIView):

    queryset = ProductVariant.objects.all()

    serializer_class = ProductVariantSerializer

    search_fields = (
        "variant_sku",
        "product__name",
        "barcode",
    )

    filterset_fields = (
        "product",
        "color",
        "size",
        "is_active",
    )

    ordering_fields = (
        "variant_sku",
        "stock",
        "selling_price",
        "created_at",
    )


class ProductVariantDetailAPIView(BaseDetailAPIView):

    queryset = ProductVariant.objects.all()

    serializer_class = ProductVariantSerializer