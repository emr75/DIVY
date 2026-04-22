import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/LandingPage.css";

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"
      fill="rgb(43,120,162)"
      stroke="rgb(43,120,162)"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);

const Stars = () => (
  <div className="t-stars">
    <Star /><Star /><Star /><Star /><Star />
  </div>
);

const testimonials = [
  {
    id: "sarah",
    quote:
      "I've invested in both stocks and real estate for years, but DIVY offers something unique. I can now diversify into tangible luxury assets with the same ease as buying stocks, but with much better returns.",
    name: "Sarah Chen",
    role: "Real Estate Investor",
    photo: "/images/stock-image-1.png",
  },
  {
    id: "michael",
    quote:
      "Traditional real estate requires huge capital and lacks liquidity. With DIVY, I get exposure to high-value assets without tying up hundreds of thousands, and I can sell my shares whenever I need to.",
    name: "Michael Rodriguez",
    role: "Real Estate Investor",
    photo: "/images/stock-photo-3.jpg",
  },
  {
    id: "emily",
    quote:
      "The investing functionality is seamless. I can buy and sell shares instantly, and the portfolio analytics help me track my returns. Highly recommend!",
    name: "Emily Thompson",
    role: "Stock Trader",
    photo: "/images/stock-photo-2.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-inner">

        {/* Header */}
        <div className="testimonials-hdr">
          <div className="testimonials-eyebrow">
            <span className="testimonials-eyebrow-line" />
            Investor Stories
            <span className="testimonials-eyebrow-line" />
          </div>
          <h2 className="testimonials-title">What Our Investors Say</h2>
          <p className="testimonials-sub">
            Join thousands of satisfied investors building wealth through fractional ownership
          </p>
        </div>

        {/* Cards */}
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="t-card">
              <Stars />

              <p className="t-quote">"{t.quote}"</p>

              <div className="t-divider" />

              <div className="t-author">
                <div className="t-avatar">
                  {t.photo && (
                    <img src={t.photo} alt={t.name} />
                  )}
                </div>

                <div className="t-author-info">
                  <span className="t-name">{t.name}</span>
                  <span className="t-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}