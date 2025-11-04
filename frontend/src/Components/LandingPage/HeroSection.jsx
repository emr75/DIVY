import React from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/LandingPage.css';

export const HeroSection = () => {
    return (
        <div className='wrapper hero-wrapper'>
            <div className="hero-content">
                <div className="hero-badge">🚀 Fractional Investing Made Simple</div>
                <h1 className="hero-title">
                    Own Premium Assets,<br />
                    <span className="gradient-text">Without the Premium Price</span>
                </h1>
                <p className="hero-description">
                    Own a piece of premium assets with ease. <br></br>DIVY lets you invest in high-value items through fractional ownership.
                    Join others, pool funds, and trade your shares securely anytime.</p>
                <div className="hero-actions">
                    <Link to="./register" className="btn-primary">
                        Start Investing
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                    <Link to="./explore" className="btn-secondary">
                        Explore Assets
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;