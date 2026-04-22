import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/LandingPage.css";

export default function FeaturedOpportunity() {
  return (
    <section className="featured">
      <div className="featured-inner">

        {/* ── Header ── */}
        <div className="featured-hdr">
          <div className="featured-eyebrow">
            <span className="featured-eyebrow-line" />
            Featured Opportunity
            <span className="featured-eyebrow-line" />
          </div>
          <h2 className="featured-title">Invest in Something Real</h2>
          <p className="featured-sub">
            Discover premium assets available for fractional investment
          </p>
        </div>

        {/* ── Asset card ── */}
        <div className="featured-card">

          {/* ── IMAGE PANEL ─────────────────────────────────────────*/}
          <div className="asset-card-img">
                <img
                  src="/images/apartment-placeholder.jpg"
                  alt="255 Johnson Street"
                  className="asset-card-photo"
                />
          </div>
          {/* ── Content panel ── */}
          <div className="asset-card-body">

            <div>
              <span className="asset-tag">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="6" width="10" height="6" rx="0.8" stroke="rgb(43,120,162)" strokeWidth="1.2"/>
                  <polygon points="6,1 11,6 1,6" stroke="rgb(43,120,162)" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                </svg>
                Real Estate
              </span>
            </div>

            <div className="asset-name">255 Johnson Street</div>

            <div className="asset-stats">
              <div className="stat">
                <span className="stat-label">Total Value</span>
                <span className="stat-value">$250,000</span>
              </div>
              <div className="stat">
                <span className="stat-label">Per Share</span>
                <span className="stat-value">$15,000</span>
              </div>
              <div className="stat">
                <span className="stat-label">Available</span>
                <span className="stat-value">120 / 300</span>
              </div>
              <div className="stat">
                <span className="stat-label">Return</span>
                <span className="stat-value positive">+12.5%</span>
              </div>
            </div>

            <div className="asset-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "40%" }} />
              </div>
              <span className="progress-label">40% funded — 180 shares remaining</span>
            </div>

            <div className="asset-actions">
              <Link to="#" className="btn-invest">
                Invest Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="#" className="btn-details">
                View details
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="rgb(43,120,162)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

          </div>
        </div>

        {/* ── Footer ── */}
        <div className="featured-footer">
          <Link to="/listings" className="btn-view-all">
            View All Assets
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}