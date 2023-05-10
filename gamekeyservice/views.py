import random

from django.views.generic import TemplateView
from random import sample

from .models import Game


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["hot_games"] = Game.objects.filter(discount__gt=0).values(
            "image",
            "price",
            "discount"
        )
        try:
            game_ids = Game.objects.filter().values_list('id', flat=True)
            print(game_ids)
            random_ids = sample(list(game_ids), 15)
            context["random_games"] = Game.objects.order_by('-image').filter(id__in=random_ids).values(
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
        context["hot_games"] = Game.objects.filter(discount__gt=0).values(
            "name",
            "image",
            "price",
            "discount"
        )
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
