from dj_rest_auth.registration.views import VerifyEmailView
from rest_framework import routers

from django.urls import path, include
from .apis.views import SendEmailVerificationView


urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('send-email-verification/', SendEmailVerificationView.as_view(), name='send_email_verification'),
]
