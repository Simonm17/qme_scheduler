import urllib.parse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.exceptions import APIException
from allauth.account.admin import EmailAddress
from allauth.account.utils import send_email_confirmation
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from ..models import User

"""
    OAuth2 workflow ->
    1. Frontend button.onClick() => GET: backend/users/auth/login/ -> trigger views.oauth2_login
    2. oauth2_login redirects user for oauth login -> 200 ->
    3. OAuth provider redirects user to views.oauth2_callback with access code in params
    4. oauth2_callback redirects user to a specified `callback_url` with the code
    5. callback_url view sends POST to OAuth2ConnectView with the code
    6. OAuth2ConnectView takes access code and returns auth token on 200
    7. Use auth token to authenticate users in frontend. 

"""
class SendEmailVerificationView(APIView):
    '''
    https://github.com/iMerica/dj-rest-auth/issues/44
    '''
    permission_classes = [AllowAny]

    def post(self, request):
        user = get_object_or_404(User, email=request.data['email'])
        email_address = EmailAddress.objects.filter(user=user, verified=True).exists()

        if email_address:
            return Response({'message': 'This email is already verified.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                send_email_confirmation(request, user=user)
                return Response({'message': 'Verification e-mail sent.'}, status=status.HTTP_201_CREATED)
            except APIException:
                return Response({'message': 'This email does not exist, please create a new account.'}, status=status.HTTP_403_FORBIDDEN)

class GoogleConnect(SocialLoginView):
    client_class = OAuth2Client
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://localhost:8000'