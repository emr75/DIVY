from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from userauth.jwtutils import jwt_required, get_user_from_request

from .utils import UserSerializer
from .models import User


# CREATE user
@api_view(['POST'])
def create_user(request):
    user = UserSerializer(data=request.data)

    #TODO: Add server-side validation, make sure its reflected on front-end
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    else:
        print('invalid user')
        return Response(user.data, status=status.HTTP_304_NOT_MODIFIED)

# READ user
@api_view(['GET'])
def get_user(request,id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        # User not found
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    data = UserSerializer(user)
    return Response(data.data, status=status.HTTP_200_OK)

# UPDATE user
@api_view(['PATCH'])
@jwt_required
def update_user(request, id):
    userFromToken = get_user_from_request(request)
    if userFromToken.id != id:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        # User not found
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    #TODO: Add server-side validation, make sure its reflected on front-end
    # This logic needs to be looked into as well when implementing validations
    serializer = UserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE user
@api_view(['DELETE'])
@jwt_required
def delete_user(request, id):
    userFromToken = get_user_from_request(request)
    if userFromToken.id != id:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        # User not found
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)