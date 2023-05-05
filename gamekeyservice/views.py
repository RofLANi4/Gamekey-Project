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

        game_ids = Game.objects.filter().values_list('id', flat=True)
        random_ids = sample(list(game_ids), len(game_ids))
        context["random_games"] = Game.objects.filter(id__in=random_ids).values(
            "name",
            "image",
            "price",
            "discount"
        )[:5]
        return context
