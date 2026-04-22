import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/LandingPage.css";

const trustPoints = [
  "No credit card required",
  "Secure & regulated",
  "24/7 support",
];

export default function CTASection() {
  return (
    <section className="cta">
      {/* faint grid overlay — matches hero */}
      <div className="cta-grid-overlay" aria-hidden="true" />

      <div className="cta-inner">

        <div className="cta-eyebrow">
          <span className="cta-eyebrow-line" />
          Get Started
          <span className="cta-eyebrow-line" />
        </div>

        <h2 className="cta-title">
          Ready to Start Building<br />
          <em>Your Portfolio?</em>
        </h2>

        <p className="cta-sub">
          Join thousands of investors already diversifying their portfolios with
          premium fractional assets. Start with as little as $50 and own a piece of luxury.
        </p>

        <div className="cta-actions">
          <Link to="/register" className="cta-btn-primary">
            Create Free Account
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgb(43,120,162)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/contact" className="cta-btn-ghost">
            Talk to an Expert
          </Link>
        </div>

        <ul className="cta-trust">
          {trustPoints.map((point) => (
            <li key={point} className="cta-trust-item">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1l1.2 2.6 2.8.4-2 2 .5 2.8L6 7.5 3.5 8.8l.5-2.8-2-2 2.8-.4z"
                  fill="rgba(255,255,255,0.7)"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}