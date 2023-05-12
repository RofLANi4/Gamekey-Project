from django.http import JsonResponse
from django.utils.dateformat import DateFormat
from django.views import View
from django.views.generic import TemplateView, DetailView
from .models import Game
from django.utils import timezone
from datetime import timedelta

TODAY = timezone.now().date()
SIX_MONTH_PAST = TODAY - timedelta(days=365)


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        game_length = 15

        context["random_games"] = Game.objects.filter(release_date__lte=TODAY).order_by("?")[:game_length].values(
            "id",
            "name",
            "image",
            "price",
            "discount"
        )

        context["random1_games"] = Game.objects.filter(release_date__lte=TODAY).order_by("?")[:game_length].values(
            "id",
            "name",
            "image",
            "price",
            "discount"
        )
        return context


class NewGame(TemplateView):
    template_name = "new_game.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        game_length = 10

        context["new_games"] = Game.objects.filter(release_date__range=[
            SIX_MONTH_PAST,
            TODAY
        ]).order_by("?")[:game_length].values(
            "id",
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

        game_length = 10

        context["discount_games"] = Game.objects.filter(discount__gt=0).order_by("?")[:game_length].values(
            "id",
            "name",
            "image",
            "price",
            "discount"
        )
        return context


class ComingSoon(TemplateView):
    template_name = "coming_soon.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        game_length = 10

        context["coming_soon"] = Game.objects.filter(release_date__gte=TODAY).order_by("?")[:game_length].values(
            "id",
            "name",
            "image",
            "price",
            "discount"
        )

        return context


class SearchView(View):
    def get(self, request):
        query = request.GET.get("q")
        if query:
            results = Game.objects.filter(name__contains=query).values(
                "id",
                "name",
                "image",
            )
            print(results)
        else:
            results = []
        return JsonResponse({"results": list(results)})


class GamePage(DetailView):
    template_name = "game_page.html"
    model = Game

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['genres'] = self.object.genre.all()
        release_date = DateFormat(self.object.release_date).format("Y-m-d")
        context['release_date'] = release_date

        return context