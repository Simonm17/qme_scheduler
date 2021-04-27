from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import PasswordResetConfirmView
from allauth.socialaccount.providers.google.views import oauth2_login, oauth2_callback

from django.urls import path, include
from .apis.views import SendEmailVerificationView, GoogleConnect, google_callback


urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('send-email-verification/', SendEmailVerificationView.as_view(), name='send_email_verification'),
    path('google/connect/', GoogleConnect.as_view(), name='google_connect'),
    path('auth/login/', oauth2_login, name='google_login'),
    path('auth/callback/', google_callback, name='google_callback'),
]
