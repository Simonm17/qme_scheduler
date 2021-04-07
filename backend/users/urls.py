from dj_rest_auth.registration.views import VerifyEmailView
from rest_framework import routers

from django.urls import path, include
from .apis.views import EmailConfirmation
from .apis.viewsets import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('registration/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('registration/account-confirm-email/<str:key>', VerifyEmailView.as_view(), name='account_confirm_email'),
    path('send-email/', EmailConfirmation.as_view(), name='send_email'),
]
