import React, { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import logo from "../Assets/divy-logo-t.png";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

// Nav logic
const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  // const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    console.log("navbar useEffect");

    let jwt_token = Cookies.get("jwt_token");

    if (jwt_token) {
      (async () => {
        // console.log(token)

        // let token = JSON.parse(jwt_token)
        try {
          const response = await axios.post("http://localhost:8000/auth/user_info", {
            jwt_token: jwt_token,
          });

          if (response.status === 200) {
            console.log(response.data["message"]);
          }

          setIsLoggedIn(true);
        } catch (error) {
          // setResponseMessage('Error with navbar useEffect and jwt.');
          console.log("Error:", error);
          alert("Error with navbar useEffect and jwt.");
        }
      })();
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("jwt_token");
    navigate("/landingpage");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/landingpage">
          <img src={logo} alt="Divy logo" className="logo-img" />
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
