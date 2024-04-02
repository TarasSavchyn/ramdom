from rest_framework import routers

from randomium.views import BankViewSet, AddressViewSet

router = routers.DefaultRouter()

router.register(r"banks", BankViewSet)
router.register(r"addresses", AddressViewSet)


urlpatterns = router.urls

app_name = "randomium"
