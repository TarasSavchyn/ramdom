from rest_framework import serializers

from randomium.models import Bank, Address


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ["name", "rating", "address", "user"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["country", "city", "street", "postal_code"]
