from django.contrib import admin
from .models import Category, Unit, Color, Fabric, Size


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "name",
    )

    ordering = (
        "name",
    )
    
@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "is_active",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )
    
    
@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "is_active",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )
    
    
@admin.register(Fabric)
class FabricAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "is_active",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )
    
    
@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "is_active",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )