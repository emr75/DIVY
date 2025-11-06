import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/LandingPage.css";

export const CTA = () => {
    return (
        <div className='wrapper cta-wrapper'>
            <div className="cta-container">
                <div className="cta-content">
                    <h2 className="cta-title">
                        Ready to Start Building Your Portfolio?
                    </h2>
                    <p className="cta-description">
                        Join thousands of investors who are already diversifying their portfolios with premium fractional assets.
                        Start with as little as $50 and own a piece of luxury.
                    </p>
                    <div className="cta-actions">
                        <Link to="./register" className="cta-btn-primary">
                            Create Free Account
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <Link to="./contact" className="cta-btn-secondary">
                            Talk to an Expert
                        </Link>
                    </div>
                    <div className="cta-trust">
                        <div className="trust-item">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 1L12.5 6.5L18.5 7.5L14.25 11.5L15.25 17.5L10 14.5L4.75 17.5L5.75 11.5L1.5 7.5L7.5 6.5L10 1Z"/>
                            </svg>
                            <span>No credit card required</span>
                        </div>
                        <div className="trust-item">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 1L12.5 6.5L18.5 7.5L14.25 11.5L15.25 17.5L10 14.5L4.75 17.5L5.75 11.5L1.5 7.5L7.5 6.5L10 1Z"/>
                            </svg>
                            <span>Secure & regulated</span>
                        </div>
                        <div className="trust-item">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 1L12.5 6.5L18.5 7.5L14.25 11.5L15.25 17.5L10 14.5L4.75 17.5L5.75 11.5L1.5 7.5L7.5 6.5L10 1Z"/>
                            </svg>
                            <span>24/7 support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;