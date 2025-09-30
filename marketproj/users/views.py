from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def create_user(request):
    return HttpResponse("User created successfully")

def get_user(request):
    return HttpResponse("User") 

def update_user(request):
    return HttpResponse("User updated successfully")

def delete_user(request):
    return HttpResponse("User deleted successfully")