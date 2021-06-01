from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import PasswordResetConfirmView
from allauth.socialaccount.providers.google.views import oauth2_login, oauth2_callback

from django.urls import path, include
from .api.views import SendEmailVerificationView, GoogleConnect, google_callback
from .views import profile, select_party

urlpatterns = [
    # https://github.com/iMerica/dj-rest-auth/issues/152  <-- PasswordResetConfirm configuration
    path(
        'password/reset/confirm/<uidb64>/<token>/',
        PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'
    ), # renders frontend.com/password/..
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('send-email-verification/', SendEmailVerificationView.as_view(), name='send_email_verification'),
    path('google/connect/', GoogleConnect.as_view(), name='google_connect'),
    path('google/login/', oauth2_login, name='google_login'),
    path('google/callback/', google_callback, name='google_callback'),
]
