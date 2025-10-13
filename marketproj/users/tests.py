from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from rest_framework import status

from .models import User

#Generic CRUD tests for user
class UserTests(TestCase):
    def setUp(self):
        self.create_url = reverse('create_user')
        self.get_url = lambda id: reverse('get_user', args=[id])
        self.update_url = lambda id: reverse('update_user', args=[id])
        self.delete_url = lambda id: reverse('delete_user', args=[id])
        self.user_data = {
            "username": "testuser",
            "password": "password123",
            "email": "abc@xyz.com",
            "phone": "1234567890"
        }

    def test_create_user(self):
        """Test creating a user"""
        response = self.client.post(self.create_url, self.user_data, content_type='application/json')

        # Verify response code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify returned object has an ID
        self.assertIsNotNone(response.data.get("id"))
        user_id = response.data.get("id")

        # Verify user is actually created in the database
        user = User.objects.get(id=user_id)
        self.assertIsNotNone(user)
        self.assertEqual(user.username, self.user_data["username"])
        self.assertEqual(user.emailid, self.user_data["emailid"])
        self.assertEqual(user.phone_number, self.user_data["phone_number"])
        self.assertEqual(user.password, make_password(self.user_data["password"]))  # Password should be hashed

    def test_get_user(self):
        """Test retrieving a user"""
        create_resp = self.client.post(self.create_url, self.user_data, content_type='application/json')
        user_id = create_resp.data.get("id")

        response = self.client.get(self.get_url(user_id), content_type='application/json')

        #Verify response code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify returned object has an ID
        self.assertIsNotNone(response.data.get("id"))
        user_id = response.data.get("id")

        # Verify returned user data
        user = User.objects.get(id=user_id)
        self.assertIsNotNone(user)
        self.assertEqual(response.data["id"], user.id)
        self.assertEqual(response.data["username"], user.username)
        self.assertEqual(response.data["email"], user.email)
        self.assertEqual(response.data["phone"], user.phone)
        self.assertNotIn("password", response.data)  # Password should not be returned

    def test_update_user(self):
        """Test updating a user"""
        create_resp = self.client.post(self.create_url, self.user_data, content_type='application/json')
        user_id = create_resp.data.get("id")

        updated_data = {
            "id": user_id,
            "username": "updateduser",
            "email": "ijk@pqr.com",
            "phone": "0987654321",
        }

        response = self.client.patch(self.update_url(user_id), updated_data, content_type='application/json')

        #Verify response code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify returned object has an ID
        self.assertIsNotNone(response.data.get("id"))
        self.assertEqual(response.data.get("id"), updated_data["id"])

        # Verify returned user data
        user = User.objects.get(id=user_id)
        self.assertIsNotNone(user)
        self.assertEqual(updated_data["username"], user.username)
        self.assertEqual(updated_data["email"], user.email)
        self.assertEqual(updated_data["phone"], user.phone)
        self.assertNotIn("password", response.data)  # Password should not be returned

    def test_delete_user(self):
        """Test deleting a user"""
        create_resp = self.client.post(self.create_url, self.user_data, content_type='application/json')
        user_id = create_resp.data.get("id")

        response = self.client.delete(self.delete_url(user_id), content_type='application/json')

        #Verify response code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify user is actually deleted from the database
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(id=user_id)
