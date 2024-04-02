from rest_framework import viewsets

from randomium.models import Bank, Address
from randomium.serializers import BankSerializer, AddressSerializer


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


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
