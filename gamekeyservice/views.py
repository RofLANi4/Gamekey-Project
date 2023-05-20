import json

from django.http import JsonResponse
from django.utils.dateformat import DateFormat
from django.views import View
from django.views.generic import TemplateView, DetailView, ListView
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

        # Get the cart data from the cookie
        cart = self.request.COOKIES.get("cart")

        # Add the cart data to the context dictionary
        context["cart"] = json.loads(cart) if cart else {}
        games_in_cart = sum(
            quantity["quantity"] for quantity in context["cart"].values()
        )
        if games_in_cart == 0:
            games_in_cart = None

        context["shop_cart"] = games_in_cart

        context["random_games"] = (
            Game.objects.filter(release_date__lte=TODAY)
            .order_by("?")[:game_length]
            .values("id", "name", "image", "price", "discount")
        )

        context["random1_games"] = (
            Game.objects.filter(release_date__lte=TODAY)
            .order_by("?")[:game_length]
            .values("id", "name", "image", "price", "discount")
        )
        return context


class NewGame(TemplateView):
    template_name = "new_game.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Get the cart data from the cookie
        cart = self.request.COOKIES.get("cart")

        # Add the cart data to the context dictionary
        context["cart"] = json.loads(cart) if cart else {}
        games_in_cart = sum(
            quantity["quantity"] for quantity in context["cart"].values()
        )
        if games_in_cart == 0:
            games_in_cart = None

        context["shop_cart"] = games_in_cart

        game_length = 10

        context["new_games"] = (
            Game.objects.filter(release_date__range=[SIX_MONTH_PAST, TODAY])
            .order_by("?")[:game_length]
            .values("id", "name", "image", "price", "discount")
        )
        return context


class Discounts(TemplateView):
    template_name = "discount.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Get the cart data from the cookie
        cart = self.request.COOKIES.get("cart")

        # Add the cart data to the context dictionary
        context["cart"] = json.loads(cart) if cart else {}
        games_in_cart = sum(
            quantity["quantity"] for quantity in context["cart"].values()
        )
        if games_in_cart == 0:
            games_in_cart = None

        context["shop_cart"] = games_in_cart

        game_length = 10

        context["discount_games"] = (
            Game.objects.filter(discount__gt=0)
            .order_by("?")[:game_length]
            .values("id", "name", "image", "price", "discount")
        )
        return context


class ComingSoon(TemplateView):
    template_name = "coming_soon.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Get the cart data from the cookie
        cart = self.request.COOKIES.get("cart")

        # Add the cart data to the context dictionary
        context["cart"] = json.loads(cart) if cart else {}
        games_in_cart = sum(
            quantity["quantity"] for quantity in context["cart"].values()
        )
        if games_in_cart == 0:
            games_in_cart = None

        context["shop_cart"] = games_in_cart

        game_length = 10

        context["coming_soon"] = (
            Game.objects.filter(release_date__gte=TODAY)
            .order_by("?")[:game_length]
            .values("id", "name", "image", "price", "discount")
        )

        return context


class SearchView(View):
    def get(self, request):
        query = request.GET.get("q")
        if query:
            results = Game.objects.filter(name__contains=query)[:4].values(
                "id", "name", "image", "price", "discount"
            )
        else:
            results = []
        return JsonResponse({"results": list(results)})


# class Order(View):
#     def get(self, request):
#         query = request.GET.COOKIES.get('cart')
#         if query:
#             results = Game.objects.filter(name__contains=query)[:4].values(
#                 "id",
#                 "name",
#                 "image",
#                 "price",
#                 "discount"
#             )
#         else:
#             results = []
#         return JsonResponse({"results": list(results)})


class GamePage(DetailView):
    template_name = "game_page.html"
    model = Game

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        cart = self.request.COOKIES.get("cart")

        context["cart"] = json.loads(cart) if cart else {}
        games_in_cart = sum(
            quantity["quantity"] for quantity in context["cart"].values()
        )
        if games_in_cart == 0:
            games_in_cart = None

        context["shop_cart"] = games_in_cart

        context["genres"] = self.object.genre.all()
        release_date = DateFormat(self.object.release_date).format("d-m-Y")
        context["release_date"] = release_date

        new_games = (Game.objects.filter(release_date__range=[SIX_MONTH_PAST, TODAY])
            .order_by("?")[:4]
            .values("id", "name", "image", "price", "discount"))
        discount_games = (Game.objects.filter(discount__gt=0)
            .order_by("?")[:4]
            .values("id", "name", "image", "price", "discount"))

        context["recommend_games"] = new_games | discount_games

        return context


class GameListView(ListView):
    template_name = "list_view.html"
    model = Game
    context_object_name = "games"

    def get_queryset(self):
        query = self.request.GET.get("q")
        if query:
            return Game.objects.filter(name__icontains=query)
        else:
            return Game.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Get the cart data from the cookie
        cart = self.request.COOKIES.get("cart")

        # Add the cart data to the context dictionary
        context["cart"] = json.loads(cart) if cart else {}
        games_in_cart = sum(
            quantity["quantity"] for quantity in context["cart"].values()
        )
        if games_in_cart == 0:
            games_in_cart = None

        context["shop_cart"] = games_in_cart

        return context


class ShopCart(TemplateView):
    template_name = "shop_cart.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Get the cart data from the cookie
        cart = self.request.COOKIES.get("cart")

        # Add the cart data to the context dictionary
        cart = json.loads(cart) if cart else {}
        context["cart"] = cart
        ids = [game_id for game_id in context["cart"].keys()]
        quantities = [quantity["quantity"] for quantity in context["cart"].values()]
        context["shop_cart"] = Game.objects.filter(id__in=ids)
        context["quantities"] = quantities
        context["quantities_sum"] = sum(context["quantities"])
        context["games"] = zip(context["shop_cart"], context["quantities"])
        games_in_cart = {}
        for game in context["shop_cart"]:
            game_price = game.price
            if game.discount:
                game_price = round(game.price - (game_price * (game.discount / 100)))
            games_in_cart[game.id] = game_price

        cart_price = 0
        for id_, price in games_in_cart.items():
            cart_price += cart[str(id_)]["quantity"] * price

        context["cart_price"] = cart_price

        return context
