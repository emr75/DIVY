from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth.hashers import check_password
from django.conf import settings

from users.models import User

from .jwtutils import generate_jwt, get_user_from_jwt


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


# GET user info
@api_view(["POST"])
def user_info(request):

    token = request.data.get("jwt_token")

    # print(token)

    # print()
    user = get_user_from_jwt(token)

    id = user.get_object().get("id")
    username = user.get_object().get("username")
    email = user.get_object().get("email")
    phone = user.get_object().get("phone")
    created_at = user.get_object().get("created_at")
    modified_at = user.get_object().get("modified_at")

    # print()

    if user != None:
        return Response(
            {
                "message": "Authentication successful",
                "username": username,
                "email": email,
                "phone": phone,
                "created_at": created_at,
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"error": "Could not get user"}, status=status.HTTP_401_UNAUTHORIZED
        )
