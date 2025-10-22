from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password

from users.utils import UserSerializer
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
        serializer = UserSerializer(user)
        #TODO: Implement JWT
        return Response({
            "message": "Login successful",
            "user": serializer.data
        }, status=status.HTTP_200_OK)
    else:
        # Invalid password
        return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)