import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const floatingCards = [
  { label: "Luxury Villa", location: "Malibu, CA", value: "$2.4M", return: "+12.4%", emoji: "🏡", delay: "0s" },
  { label: "Rare Whiskey", location: "Scotch Collection", value: "$84K", return: "+31.2%", emoji: "🥃", delay: "0.6s" },
  { label: "Vintage Ferrari", location: "1962 GTO", value: "$1.1M", return: "+18.7%", emoji: "🏎️", delay: "1.2s" },
];

export const HeroSection = () => {
  return (
    <section className="hero-root">
      {/* Background mesh */}
      <div className="hero-mesh" />
      <div className="hero-grain" />

      {/* Grid lines */}
      <div className="hero-grid" />

      <div className="hero-inner">
        {/* Left: copy */}
        <div className="hero-copy">

          <h1 className="hero-title">
            Own Premium
            <br />
            <em className="hero-title-accent">Assets.</em>
            <br />
            Any Share Size.
          </h1>

          <p className="hero-desc">
            Pool capital with other investors and hold fractional stakes in real estate, collectibles,
            and alternative assets. Trade your shares on our secondary market, anytime.
          </p>

          <div className="hero-actions">
            <Link to="../register" className="btn-cta">
              Start Investing
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="./explore" className="btn-ghost">
              Browse Assets
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">$48M+</span>
              <span className="stat-label">Assets Listed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">12K+</span>
              <span className="stat-label">Investors</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">94%</span>
              <span className="stat-label">Avg. Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Right: floating cards */}
        <div className="hero-cards-area" aria-hidden="true">
          <div className="hero-glow" />
          {floatingCards.map((card, i) => (
            <div
              key={i}
              className={`asset-card asset-card--${i}`}
              style={{ animationDelay: card.delay }}
            >
              <div className="asset-card-top">
                <span className="asset-emoji">{card.emoji}</span>
                <span className="asset-return">{card.return}</span>
              </div>
              <div className="asset-name">{card.label}</div>
              <div className="asset-location">{card.location}</div>
              <div className="asset-card-bottom">
                <span className="asset-value">{card.value}</span>
                <div className="asset-bar">
                  <div className="asset-bar-fill" style={{ width: `${55 + i * 15}%` }} />
                </div>
                <span className="asset-funded">{55 + i * 15}% funded</span>
              </div>
            </div>
          ))}

          {/* Decorative orbit ring */}
          <div className="orbit-ring" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;