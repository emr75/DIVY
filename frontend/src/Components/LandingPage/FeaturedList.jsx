import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/LandingPage.css";

export const FeaturedList = () => {
  const listing = {
    id: 1,
    image: "🏠",
    name: "255 Johnson Street",
    category: "Real Estate",
    totalValue: "$250,000",
    sharePrice: "$15,000",
    sharesAvailable: "120/300",
    roi: "+12.5%",
  };

  return (
    <div className="wrapper featured-wrapper">
      <div className="section-header">
        <h2 className="section-title">Featured Opportunity</h2>
        <p className="section-subtitle">
          Discover premium assets available for fractional investment
        </p>
      </div>
      <div className="featured-single-container">
        <div className="featured-single-card">
          <div className="featured-image-large">{listing.image}</div>
          <div className="featured-content-large">
            <div className="featured-category">{listing.category}</div>
            <h3 className="featured-name">{listing.name}</h3>
            <div className="featured-stats-row">
              <div className="featured-stat-item">
                <span className="featured-stat-label">Total Value</span>
                <span className="featured-stat-value">{listing.totalValue}</span>
              </div>
              <div className="featured-stat-item">
                <span className="featured-stat-label">Per Share</span>
                <span className="featured-stat-value">{listing.sharePrice}</span>
              </div>
              <div className="featured-stat-item">
                <span className="featured-stat-label">Available</span>
                <span className="featured-stat-value">{listing.sharesAvailable}</span>
              </div>
              <div className="featured-stat-item">
                <span className="featured-stat-label">Return</span>
                <span className="featured-stat-value roi-positive">{listing.roi}</span>
              </div>
            </div>
            <button className="featured-invest-btn">Invest Now</button>
          </div>
        </div>
        <div className="view-all-container">
          <Link to="./marketplace" className="view-all-btn">
            View All Assets
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedList;
