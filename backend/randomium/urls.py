from django.urls import path
from rest_framework import routers

from randomium.views import BankViewSet, AddressViewSet, export_banks_to_csv
from randomium.views import export_addresses_to_csv

router = routers.DefaultRouter()

router.register(r"banks", BankViewSet)
router.register(r"addresses", AddressViewSet)


urlpatterns = [
    path("export-addresses/", export_addresses_to_csv, name="export_addresses_to_csv"),
    path("export-banks/", export_banks_to_csv, name="export_banks_to_csv"),
] + router.urls

app_name = "randomium"
