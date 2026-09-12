from apps.common.base_views import (
    BaseListCreateAPIView,
    BaseDetailAPIView,
)

from .models import Category, Unit, Color, Fabric, Size
from .serializers import (
    CategorySerializer,
    UnitSerializer,
    ColorSerializer,
    FabricSerializer,
    SizeSerializer,
)

class CategoryListCreateAPIView(BaseListCreateAPIView):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    search_fields = ("name",)
    filterset_fields = ("is_active",)
    ordering_fields = ("name", "created_at")
     
class CategoryDetailAPIView(BaseDetailAPIView):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
               
class UnitListCreateAPIView(BaseListCreateAPIView):

    queryset = Unit.objects.all()
    serializer_class = UnitSerializer

    search_fields = ("name",)
    filterset_fields = ("is_active",)
    ordering_fields = ("name", "created_at")

class UnitDetailAPIView(BaseDetailAPIView):

    queryset = Unit.objects.all()
    serializer_class = UnitSerializer  
  
    
        
class ColorListCreateAPIView(BaseListCreateAPIView):

    queryset = Color.objects.all()
    serializer_class = ColorSerializer  
    
    search_fields = ("name",)
    filterset_fields = ("is_active",)
    ordering_fields = ("name", "created_at")    
    
        
class ColorDetailAPIView(BaseDetailAPIView):

    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    
     
     
class FabricListCreateAPIView(BaseListCreateAPIView):

    queryset = Fabric.objects.all()
    serializer_class = FabricSerializer   
    
    search_fields = ("name",)
    filterset_fields = ("is_active",)
    ordering_fields = ("name", "created_at")
        
    
class FabricDetailAPIView(BaseDetailAPIView):

    queryset = Fabric.objects.all()
    serializer_class = FabricSerializer
    
    
    
class SizeListCreateAPIView(BaseListCreateAPIView):

    queryset = Size.objects.all()
    serializer_class = SizeSerializer
    
    search_fields = ("name",)
    filterset_fields = ("is_active",)
    ordering_fields = ("name", "created_at")


class SizeDetailAPIView(BaseDetailAPIView):

    queryset = Size.objects.all()
    serializer_class = SizeSerializer