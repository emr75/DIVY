from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth.hashers import check_password
from django.conf import settings

from users.models import User

from .jwtutils import generate_jwt


# LOGIN user
@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    # Invalid username or password
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if check_password(password, user.password):
        # Successful login
        token = generate_jwt(user)

        return Response(
            {
                "message": "Login successful",
                "token": token,
            },
            status=status.HTTP_200_OK,
        )
    else:
        # Invalid password
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
