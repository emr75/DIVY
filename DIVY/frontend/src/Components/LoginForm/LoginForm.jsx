import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Stylesheet for icons
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
/>;

// Login Form Component
const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState("");

  // Login useState
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // Updating of form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://divy-dd00.onrender.com/auth/login", form);
      setResponseMessage("Data submitted successfully!");
      // console.log(response.data); // Log the response from Django

      if (response.status === 200) {
        Cookies.set("jwt_token", response.data["token"], {
          expires: 1, // days until it expires
          secure: true, // only sent over HTTPS
          sameSite: "strict", // prevents CSRF
        });

        onLogin();
        navigate("/profile");
      }
    } catch (error) {
      setResponseMessage("Error submitting data.");
      console.log("Error:", error);
      alert("No user fund");
    }

    // navigate("/landingpage"); // redirect to dashboard (temp landingPage) after login
  };
  return (
    <div className="login-wrapper">
      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username Field */}
        <div className="lf-input">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <i className="bi bi-person"></i>
        </div>
        {/* Password */}
        <div className="lf-input">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <i className="bi bi-lock-fill"></i>
        </div>
        {/* Forgot Password */}
        <div className="forgot-pwd">
          <a href="#">Forgot password?</a>
        </div>
        {/* Submit  */}
        <button type="submit">Login</button>
        {/* Register Link */}
        <div className="register-link">
          <Link to="../register">Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
