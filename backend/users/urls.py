from dj_rest_auth.registration.views import VerifyEmailView
from allauth.socialaccount.providers.google.views import oauth2_login, oauth2_callback

from django.urls import path, include
from .apis.views import SendEmailVerificationView


urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('send-email-verification/', SendEmailVerificationView.as_view(), name='send_email_verification'),
    path('auth/login', oauth2_login, name='google_login'),
    path('auth/callback/', oauth2_callback, name='google_callback'),
]
