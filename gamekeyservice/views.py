from django.views.generic import TemplateView
from models import Game


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Home"
        context["hot_games"] = Game.objects.filter(price__discount__gt=0)

        return context
