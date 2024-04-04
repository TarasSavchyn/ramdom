from django.contrib.auth import get_user_model
from rest_framework import serializers

from randomium.models import Bank, Address

User = get_user_model()


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "country", "city", "street", "postal_code"]


class BankSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True, many=False)

    class Meta:
        model = Bank
        fields = [
            "id",
            "name",
            "rating",
            "address",
        ]
