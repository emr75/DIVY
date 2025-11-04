from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from userauth.jwtutils import generate_jwt

from .models import User


# Generic CRUD tests for user
class UserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse("create_user")
        self.get_url = lambda id: reverse("get_user", args=[id])
        self.update_url = lambda id: reverse("update_user", args=[id])
        self.delete_url = lambda id: reverse("delete_user", args=[id])
        self.user_data = {
            "username": "testuser",
            "password": "password123",
            "email": "abc@xyz.com",
            "phone": "1234567890",
        }

    def test_create_user(self):
        """Test creating a user"""
        response = self.client.post(self.create_url, self.user_data, format="json")

        # Verify response code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify returned object has an ID
        self.assertIsNotNone(response.data.get("id"))
        user_id = response.data.get("id")

        # Verify user is actually created in the database
        user = User.objects.get(id=user_id)
        self.assertIsNotNone(user)
        self.assertEqual(user.username, self.user_data["username"])
        self.assertEqual(user.email, self.user_data["email"])
        self.assertEqual(user.phone, self.user_data["phone"])
        self.assertTrue(
            check_password(self.user_data["password"], user.password)
        )  # Password should be hashed and same

    def test_get_user(self):
        """Test retrieving a user"""
        create_resp = self.client.post(self.create_url, self.user_data, format="json")
        user_id = create_resp.data.get("id")

        response = self.client.get(self.get_url(user_id))

        # Verify response code
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
        create_resp = self.client.post(self.create_url, self.user_data, format="json")
        user_id = create_resp.data.get("id")

        updated_data = {
            "username": "updateduser",
            "email": "ijk@pqr.com",
            "phone": "0987654321",
        }

        user = User.objects.get(id=user_id)
        token = generate_jwt(user)

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.patch(
            self.update_url(user_id), updated_data, content_type="application/json"
        )

        # Verify response code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify returned object has an ID
        self.assertIsNotNone(response.data.get("id"))
        self.assertEqual(response.data.get("id"), user_id)

        # Verify returned user data
        user = User.objects.get(id=user_id)
        self.assertIsNotNone(user)
        self.assertEqual(updated_data["username"], user.username)
        self.assertEqual(updated_data["email"], user.email)
        self.assertEqual(updated_data["phone"], user.phone)
        self.assertNotIn("password", response.data)  # Password should not be returned

    def test_delete_user(self):
        """Test deleting a user"""
        create_resp = self.client.post(self.create_url, self.user_data, format="json")
        user_id = create_resp.data.get("id")

        user = User.objects.get(id=user_id)
        token = generate_jwt(user)

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.delete(self.delete_url(user_id), {"id": user_id})

        # Verify response code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify user is actually deleted from the database
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(id=user_id)

    def test_user_not_found(self):
        """Test invalid user"""
        invalid_id = 9999

        # Test GET user not found
        response = self.client.get(self.get_url(invalid_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # Test UPDATE user not found
        response = self.client.patch(
            self.update_url(invalid_id),
            {"username": "xyz"},
            content_type="application/json",
        )
        self.assertEqual(
            response.status_code, status.HTTP_401_UNAUTHORIZED
        )  # Unauthorized due to missing JWT

        # Test DELETE user not found
        response = self.client.delete(self.delete_url(invalid_id), {"id": invalid_id})
        self.assertEqual(
            response.status_code, status.HTTP_401_UNAUTHORIZED
        )  # Unauthorized due to missing JWT
