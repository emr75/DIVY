import React, { useState } from 'react';
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

// Stylesheet for icons
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
/>

// Login Form Component
const LoginForm = () => {
    const navigate = useNavigate();

    // Login useState
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    // Updating of form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Authetication will go here
        //

        navigate("/landingpage"); // redirect to dashboard (temp landingPage) after login
    };
    return (
        <div className="page right wrapper">
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
                    <Link to="./register">Don't have an account?</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
