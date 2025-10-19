from django.test import TestCase
from django.urls import reverse

# Create your tests here.
class AuthTests(TestCase):
    def setUp(self):
        self.create_url = reverse('create_user')
        self.login_url = reverse('login')
        self.user_data = {
            "username": "testuser",
            "password": "password123",
            "email": "abc@xyz.com",
            "phone": "1234567890"
        }

    def test_login_user(self):
        """Test login user"""
        # Create user in db
        create_response = self.client.post(self.create_url, self.user_data, format="json")
        self.assertEqual(create_response.status_code, 201)

        # Attempt login
        login_data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        }
        login_response = self.client.post(self.login_url, login_data, format="json")

        # Verify response code
        self.assertEqual(login_response.status_code, 200)

        #TODO Verify JWT token

    def test_invalid_login(self):
        """Test invalid login"""
        #Create user in db
        create_response = self.client.post(self.create_url, self.user_data, format="json")
        self.assertEqual(create_response.status_code, 201)

        # Attempt login with wrong password
        login_data = {
            "username": self.user_data["username"],
            "password": "wrongpassword"
        }
        login_response = self.client.post(self.login_url, login_data, format="json")

        # Verify response code
        self.assertEqual(login_response.status_code, 401)

        #Attempt login with wrong username
        login_data = {
            "username": "wronguser",
            "password": self.user_data["password"]
        }
        login_response = self.client.post(self.login_url, login_data, format="json")

        # Verify response code
        self.assertEqual(login_response.status_code, 401)