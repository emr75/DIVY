import React from "react";
import "../../Pages/LandingPage.css";

const features = [
  {
    id: "ownership",
    title: "Fractional Ownership",
    description:
      "Own portions of premium assets starting from as little as $50. No need for huge capital to invest in luxury items.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="16,3 28,11 23,27 9,27 4,11"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <polygon
          points="16,3 28,11 16,14 4,11"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="9" y1="27" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="27" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "analytics",
    title: "Portfolio Analytics",
    description:
      "Track your investments with detailed analytics, performance metrics, and market insights all in one dashboard.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="18" width="5" height="10" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
        <rect x="13" y="12" width="5" height="16" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
        <rect x="22" y="6" width="5" height="22" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
        <line x1="4" y1="29" x2="27" y2="29" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "community",
    title: "Community Driven",
    description:
      "Join a community of investors, participate in governance decisions, and shape the future of the platform.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="10" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
        <circle cx="21" cy="10" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
        <path d="M3 26c0-4 3.6-7 8-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M21 19c4.4 0 8 3 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M12 19c0-2.2 1.8-4 4-4s4 1.8 4 4v1" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M12 26c0-2 1.8-4 4-4s4 2 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
];

export default function WhyDIVY() {
  return (
    <section className="why-section">
      <div className="why-inner">

        <div className="why-header">
          <div className="why-eyebrow">
            <span className="why-eyebrow-line" />
            Why DIVY
            <span className="why-eyebrow-line" />
          </div>
          <h2 className="why-title">Built for Confident Investing</h2>
          <p className="why-subtitle">
            Everything you need to invest in premium assets with confidence
          </p>
        </div>

        <div className="why-grid">
          {features.map((f) => (
            <div key={f.id} className="why-card">
              <div className="why-card-icon">{f.icon}</div>
              <h3 className="why-card-title">{f.title}</h3>
              <p className="why-card-desc">{f.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}