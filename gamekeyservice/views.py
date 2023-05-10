from django.views.generic import TemplateView
from random import sample
from .models import Game
from django.utils import timezone
from datetime import timedelta

TODAY = timezone.now().date()
SIX_MONTH_PAST = TODAY - timedelta(days=365)


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            game_ids = Game.objects.filter(release_date__lte=TODAY).values_list('id', flat=True)
            if len(game_ids) < 15:
                random_ids = sample(list(game_ids), len(game_ids))
            else:
                random_ids = sample(list(game_ids), 15)
            context["random_games"] = Game.objects.order_by('image').filter(id__in=random_ids).values(
                "name",
                "image",
                "price",
                "discount"
            )
        except ValueError:
            pass
        try:
            game_ids = Game.objects.filter(release_date__lte=TODAY).values_list('id', flat=True)
            if len(game_ids) < 15:
                random_ids = sample(list(game_ids), len(game_ids))
            else:
                random_ids = sample(list(game_ids), 15)

            context["random1_games"] = Game.objects.order_by('-image').filter(id__in=random_ids).values(
                "name",
                "image",
                "price",
                "discount"
            )
        except ValueError:
            pass
        return context


class NewGame(TemplateView):
    template_name = "new_game.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            game_ids = Game.objects.filter(release_date__range=[SIX_MONTH_PAST, TODAY]).values_list('id', flat=True)
            if len(game_ids) < 10:
                random_ids = sample(list(game_ids), len(game_ids))
            else:
                random_ids = sample(list(game_ids), 10)

            context["new_games"] = Game.objects.order_by('-release_date').filter(id__in=random_ids).values(
                "name",
                "image",
                "price",
                "discount"
            )
            print(type(game_ids))
        except ValueError:
            pass
        return context


class Discounts(TemplateView):
    template_name = "discount.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["hot_games"] = Game.objects.filter(discount__gt=0).values(
            "name",
            "image",
            "price",
            "discount"
        )
        return context


class ComingSoon(TemplateView):
    template_name = "coming_soon.html"
