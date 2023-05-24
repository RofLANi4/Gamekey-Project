from django.urls import path
from .views import (
    HomeView,
    NewGame,
    Discounts,
    ComingSoon,
    GamePage,
    SearchView,
    GameListView,
    ShopCart,
    Profile,
    OrderedGamesInfo
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", HomeView.as_view(), name="index"),
    path("new-games/", NewGame.as_view(), name="new_games"),
    path("discounts/", Discounts.as_view(), name="discounts"),
    path("coming-soon/", ComingSoon.as_view(), name="coming_soon"),
    path('search/', SearchView.as_view(), name='search'),
    path("game-page/<int:pk>/", GamePage.as_view(), name="game_page"),
    path("game-list/", GameListView.as_view(), name="game_list"),
    path("shop-cart/", ShopCart.as_view(), name="shop_cart"),
    path("profile/", Profile.as_view(), name="profile"),
    path("keysStorage/", OrderedGamesInfo.as_view(), name="order_games"),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

app_name = "game_keys"
