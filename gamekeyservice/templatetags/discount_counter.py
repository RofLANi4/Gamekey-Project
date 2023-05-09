from django import template

register = template.Library()


@register.filter(name="discount")
def discount_counter(price, discount):
    if discount is None:
        return price
    return round(price - price * (discount / 100))
