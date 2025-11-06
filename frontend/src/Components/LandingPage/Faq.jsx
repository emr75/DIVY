import React, { useState } from "react";
import "../../Pages/LandingPage.css";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is fractional ownership?",
      answer:
        "Fractional ownership allows you to own a percentage of high-value assets by purchasing shares. Instead of buying an entire luxury watch or artwork, you can invest in a portion and benefit from its appreciation and potential returns.",
    },
    {
      question: "How do I start investing?",
      answer:
        "Simply create an account, complete the verification process, browse available assets, and purchase shares starting from as little as $50. Your ownership is immediately recorded on the blockchain for security and transparency.",
    },
    {
      question: "Can I sell my shares anytime?",
      answer:
        "Yes! Our marketplace provides liquidity by allowing you to list and sell your shares at any time. Other investors can purchase your shares, giving you the flexibility to exit investments when needed.",
    },
    {
      question: "How are assets authenticated and stored?",
      answer:
        "All assets are thoroughly vetted by industry experts and authenticated before listing. Physical assets are securely stored in insured, climate-controlled facilities with 24/7 monitoring and security.",
    },
    {
      question: "What fees does DIVY charge?",
      answer:
        "DIVY charges a 2% transaction fee when buying or selling shares, plus an annual custody fee of 1% of the asset value to cover storage, insurance, and maintenance costs.",
    },
    {
      question: "Are my investments protected?",
      answer:
        "Yes. All assets are fully insured, ownership records are maintained on the blockchain, and we comply with regulatory requirements. However, like all investments, asset values can fluctuate based on market conditions.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="wrapper faq-wrapper">
      <div className="section-header">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about investing with DIVY</p>
      </div>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
