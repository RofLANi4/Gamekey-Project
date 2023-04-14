from django.contrib import admin

from .models import Game, Genre, Developer, Customer


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "image", "developer", "price", "discount")
    list_filter = ("genre", "developer")
    search_fields = ("name", "description")
    fieldsets = (
        ("General", {
            "fields": ("name", "description", "image", "genre", "developer")
        }),
        ("Price", {
            "fields": ("price", "discount")
        })
    )
    add_fieldsets = ("description", "discount")


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Developer)
class DeveloperAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("username", "first_name", "last_name")