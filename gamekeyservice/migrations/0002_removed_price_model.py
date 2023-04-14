# Generated by Django 4.2 on 2023-04-14 09:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("gamekeyservice", "0001_initial_migration"),
    ]

    operations = [
        migrations.AddField(
            model_name="game",
            name="discount",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AddField(
            model_name="game",
            name="price",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.DeleteModel(
            name="Price",
        ),
    ]
