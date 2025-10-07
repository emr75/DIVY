from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import UserSerializer
from .models import User

# CREATE user
@api_view(['POST'])
def create_user(request):
    user = UserSerializer(data=request.data)

    #TODO: Add server-side validation, make sure its reflected on front-end
    # if data.is_valid():
    user.save()

    return Response(user.data, status=status.HTTP_201_CREATED)

# READ user
@api_view(['GET'])
def get_user(request):
    try:
        user = User.objects.get(id=request.GET.get('id'))
    except User.DoesNotExist:
        # User not found
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    data = UserSerializer(user)
    return Response(data.data, status=status.HTTP_200_OK)

# UPDATE user
@api_view(['PATCH'])
def update_user(request):
    try:
        user = User.objects.get(id=request.data.get('id'))
    except User.DoesNotExist:
        # User not found
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    #TODO: Add server-side validation, make sure its reflected on front-end
    # if data.is_valid():
    user.save()
    return Response(user.data, status=status.HTTP_200_OK)

# DELETE user
@api_view(['DELETE'])
def delete_user(request):
    try:
        user = User.objects.get(id=request.data.get('id'))
    except User.DoesNotExist:
        # User not found
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)