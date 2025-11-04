import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/LandingPage.css";

export const HeroSection = () => {
  return (
    <div className="wrapper">
      {/* For connection */}
      <h1>Fractional Ownership Marketplace</h1>
      <p>
        Own a piece of premium assets with ease. <br></br>DIVY lets you invest in high-value items
        through fractional ownership. Join others, pool funds, and trade your shares securely
        anytime.
      </p>
      <div className="sign-up-button">
        <Link to="./register">Sign Up</Link>
      </div>
      <div className="sign-up-button">
        <Link to="./login">Sign in</Link>
      </div>
    </div>
  );
};

export default HeroSection;
