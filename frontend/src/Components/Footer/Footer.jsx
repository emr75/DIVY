import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/divy-logo-t.png";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <Link to="/landingpage">
          <img src={logo} alt="Divy logo" className="footer-logo" />
        </Link>
        <div className="footer-group">
          <div className="footer-links">
            <Link to="/register" className="footer-link">
              Register
            </Link>
            <Link to="/landingpage#faq" className="footer-link">
              FAQ
            </Link>
            <Link to="/listings" className="footer-link">
              Listings
            </Link>
          </div>
          <div className="footer-links">
            <Link to="./landingpage#testimonials" className="footer-link">
              Testimonials
            </Link>
            <Link to="./" className="footer-link">
              Site Map
            </Link>
            <Link to="/loginform" className="footer-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
