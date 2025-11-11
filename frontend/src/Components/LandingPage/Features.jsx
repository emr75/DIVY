import React from "react";
import "../../Pages/LandingPage.css";

export const Features = () => {
  const features = [
    {
      icon: "💎",
      title: "Fractional Ownership",
      description:
        "Own portions of premium assets starting from as little as $50. No need for huge capital to invest in luxury items.",
    },
    {
      icon: "📊",
      title: "Portfolio Analytics",
      description:
        "Track your investments with detailed analytics, performance metrics, and market insights all in one dashboard.",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description:
        "Join a community of investors, participate in governance decisions, and shape the future of the platform.",
    },
  ];

  return (
    <div className="wrapper features-wrapper">
      <div className="section-header">
        <h2 className="section-title">Why Choose DIVY</h2>
        <p className="section-subtitle">
          Everything you need to invest in premium assets with confidence
        </p>
      </div>
      <div className="features-section">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
