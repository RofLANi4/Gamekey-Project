from django import template

register = template.Library()


@register.simple_tag(name="genres")
def discount_counter(genres):
    return ", ".join(genre.name for genre in genres)
