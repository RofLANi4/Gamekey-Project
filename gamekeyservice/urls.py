from django.urls import path
from .views import HomeView, NewGame, Discounts, ComingSoon

urlpatterns = [
    path("", HomeView.as_view(), name="index"),
    path("new-games/", NewGame.as_view(), name="new_games"),
    path("discounts/", Discounts.as_view(), name="discounts"),
    path("coming-soon/", ComingSoon.as_view(), name="coming_soon")
]

app_name = "game_keys"
