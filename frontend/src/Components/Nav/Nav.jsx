import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../Assets/divy-logo-t.png";
import './Nav.css';
import { useNavigate } from "react-router-dom";


// Nav logic
const Nav = ({isLoggedIn, setIsLoggedIn}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/landingpage")
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                {/* Logo */}
                <Link to="/landingpage">
                    <img src={logo} alt="Divy logo" className='logo-img'/>
                </Link>
                {/* Navigation Links */}
                <div className="nav-links">
                    {/* Home/Profile */}
                    {isLoggedIn ? (
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                    ) : (
                        <Link to="/landingpage" className="nav-link">
                            Home
                        </Link>
                    )}

                    {/* Listings - always visible */}
                    <Link to="/listings" className="nav-link">
                        Listings
                    </Link>

                    {/* Create Listing - only when logged in */}
                    {isLoggedIn && (
                        <Link to="/assetcreation" className="nav-link">
                            Create Listing
                        </Link>
                    )}

                    {/* Groups - only when logged in */}
                    {isLoggedIn && (
                        <Link to="/groups" className="nav-link">
                            Groups
                        </Link>
                    )}
                    {/* Auth Button */}
                    <div className="nav-auth">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="nav-btn-logout">
                                Logout
                            </button>
                        ) : (
                            <Link to="/loginform" className="nav-btn-login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;