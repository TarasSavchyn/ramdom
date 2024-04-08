import csv

from django.http import HttpResponse
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import viewsets

from randomium.models import Bank, Address
from randomium.serializers import BankSerializer, AddressSerializer


def export_addresses_to_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="addresses.csv"'

    writer = csv.writer(response)
    writer.writerow(["ID", "Country", "City", "Street", "Postal Code"])

    addresses = Address.objects.all()
    for address in addresses:
        writer.writerow(
            [
                address.id,
                address.country,
                address.city,
                address.street,
                address.postal_code,
            ]
        )

    return response


def export_banks_to_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="banks.csv"'

    writer = csv.writer(response)
    writer.writerow(
        ["ID", "Name", "Rating", "Street", "City", "Country", "Postal Code"]
    )

    banks = Bank.objects.all()
    for bank in banks:
        writer.writerow(
            [
                bank.id,
                bank.name,
                bank.rating,
                bank.address.street,
                bank.address.city,
                bank.address.country,
                bank.address.postal_code,
            ]
        )

    return response


class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        city = self.request.query_params.get("city", None)
        country = self.request.query_params.get("country", None)

        if city and country:
            # Filter banks based on city and country
            queryset = queryset.filter(address__city=city, address__country=country)
        elif city:
            # Filter banks based on city only
            queryset = queryset.filter(address__city=city)
        elif country:
            # Filter banks based on country only
            queryset = queryset.filter(address__country=country)

        return queryset

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="city",
                type={"type": "string"},
                description="Filtering by city.",
                required=False,
            ),
            OpenApiParameter(
                name="country",
                type={"type": "string"},
                description="Filtering by country.",
                required=False,
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
