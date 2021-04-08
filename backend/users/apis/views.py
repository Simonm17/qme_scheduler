from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import APIException
from allauth.account.admin import EmailAddress
from allauth.account.utils import send_email_confirmation

from ..models import User


# https://github.com/iMerica/dj-rest-auth/issues/44
class SendEmailVerificationView(APIView):
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

