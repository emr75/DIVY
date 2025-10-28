import jwt

from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth.hashers import check_password
from django.conf import settings

from users.models import User

# LOGIN user
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    #Invalid username or password
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)

    if check_password(password, user.password):
        # Successful login
        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=settings.JWT_EXP_DELTA_SECONDS)
        }
        token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

        return Response({
            "message": "Login successful",
            "token": token,
        }, status=status.HTTP_200_OK)
    else:
        # Invalid password
        return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)