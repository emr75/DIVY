import jwt

from datetime import datetime, timedelta
from rest_framework.response import Response
from functools import wraps

from django.conf import settings
from users.models import User


def generate_jwt(user):
    payload = {
        "user_id": user.id,
        "username": user.username,
        "role": user.role,
        "exp": datetime.utcnow() + timedelta(seconds=settings.JWT_EXP_DELTA_SECONDS),
    }
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return token


def jwt_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response(
                {"error": "Authorization header missing or invalid"}, status=401
            )

        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(
                token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM]
            )
            request.user = User.objects.get(id=payload["user_id"])
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
            return Response({"error": "Invalid or expired token"}, status=401)

        return func(request, *args, **kwargs)

    return wrapper


def get_user_from_request(request):
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        return get_user_from_jwt(token)
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return None


def get_user_from_jwt(token):
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM]
        )
        user_id = payload.get("user_id")
        return User.objects.get(id=user_id)
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return None


def get_role_from_request(request):
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        return get_role_from_jwt(token)
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return None


def get_role_from_jwt(token):
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM]
        )
        role = payload.get("role")
        return role
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return None
