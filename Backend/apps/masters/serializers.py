from rest_framework import serializers

from .models import Category, Unit, Color, Fabric, Size

class MasterSerializer(serializers.ModelSerializer):

    def validate_name(self, value):

        value = value.strip()

        queryset = self.Meta.model.objects.filter(
            name__iexact=value
        )

        if self.instance:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():

            raise serializers.ValidationError(
                f"{self.Meta.model.__name__} already exists."
            )

        return value
    
    
class CategorySerializer(MasterSerializer):

    class Meta:

        model = Category

        fields = "__all__"
        
        
class UnitSerializer(MasterSerializer):

    class Meta:

        model = Unit

        fields = "__all__"
        
    
class ColorSerializer(MasterSerializer):

    class Meta:

        model = Color

        fields = "__all__"
        
        
class FabricSerializer(MasterSerializer):

    class Meta:

        model = Fabric

        fields = "__all__"
        
        
class SizeSerializer(MasterSerializer):

    class Meta:

        model = Size

        fields = "__all__"