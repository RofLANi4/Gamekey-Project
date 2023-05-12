from django.urls import path, include
from .views import HomeView, NewGame, Discounts, ComingSoon, GamePage, SearchView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", HomeView.as_view(), name="index"),
    path("new-games/", NewGame.as_view(), name="new_games"),
    path("discounts/", Discounts.as_view(), name="discounts"),
    path("coming-soon/", ComingSoon.as_view(), name="coming_soon"),
    path('search/', SearchView.as_view(), name='search'),
    path("game-page/<int:pk>", GamePage.as_view(), name="game_page"),
    path('__debug__/', include('debug_toolbar.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

app_name = "game_keys"
