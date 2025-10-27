import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
// import { registerUser } from "api";

// Stylesheet for icons
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
/>

// Register Component
const Register = ({ setToken }) => {

    // For naviagtion
    const navigate = useNavigate();

    // Register useState
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        idImg: null,
        profilePic: null
    });

    // console.log(form)

    // Updating of form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Register user data
        // const APIData = await registerUser(
        //     form.firstName,
        //     form.lastName,
        //     form.email,
        //     form.password,
        //     form.confirm,
        //     form.idImg,
        //     form.profilePic
        // );

        // // Store token locally
        // localStorage.setItem("myToken", APIData.token);

        // // Send auth token
        // setToken(APIData.token);

        // Reset Form
        setForm({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm: '',
            idImg: null,
            profilePic: null
        });
        navigate("/landingpage")

        // Password validation
        if (form.password !== form.confirm) {
            alert('Passwords do not match.');
            return;
        }

        // POST Request

        // on success navigate to dashboard (landing for now)
        navigate('/landingpage');
    };

    return (
        <div className="pgr rwrapper">
            <form onSubmit={handleSubmit}>
                {/* Sign Up Field */}
                <h1>Register</h1>
                <div className="r-input">
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="r-input">
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="r-input">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Create Password */}
                <div className="r-input">
                    <input
                        name="password"
                        type="password"
                        placeholder="Create Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <i className="bi bi-lock-fill"></i>
                </div>
                {/* Retype */}
                <div className="r-input">
                    <input
                        name="confirm"
                        type="password"
                        placeholder="Retype Password"
                        value={form.confirm}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Upload ID  image - Required*/}
                <div className="uploads">
                    <label htmlFor="idImg" id='uploadImg' >Upload ID*</label>
                    <input
                        id="idImg"
                        name="idImg"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Profile Picture – Optional */}
                <div className="uploads">
                    <label htmlFor="profile-pic">Profile Picture (Optional)</label>
                    <input
                        id="profile-pic"
                        name="profile"
                        type="file"
                        accept=".jpg,.jpeg,.svg,.png,.pdf"
                        onChange={handleChange}
                    />
                </div>

                {/* Submit  */}
                <button type="submit">Create Account</button>

                {/* Register Link */}
                <div className="register-link">
                    <Link to="/loginform">Already have an account?</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;