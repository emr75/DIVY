import { useState, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/LandingPage.css";

const faqs = [
  {
    id: 0,
    question: "What is fractional ownership?",
    answer:
      "Fractional ownership allows you to own a percentage of high-value assets by purchasing shares. Instead of buying an entire luxury condo or high-value stocks, you can invest in a portion and benefit from its appreciation and potential returns.",
  },
  {
    id: 1,
    question: "How do I start investing?",
    answer:
      "Simply create an account, complete the verification process, browse available assets, and purchase shares starting from as little as $50. Your ownership is immediately recorded.",
  },
  {
    id: 2,
    question: "Can I sell my shares anytime?",
    answer:
      "Yes! Our marketplace provides liquidity by allowing you to list and sell your shares at any time. Other investors can purchase your shares, giving you the flexibility to exit investments when needed.",
  },
  {
    id: 3,
    question: "How are assets authenticated and stored?",
    answer:
      "All assets are thoroughly vetted by industry experts before listing. Physical assets are stored in secure, insured facilities, and digital ownership records are maintained on our platform.",
  },
  {
    id: 4,
    question: "What fees does DIVY charge?",
    answer:
      "DIVY charges a 2% transaction fee when buying or selling shares. There are no hidden fees, monthly charges, or account minimums beyond the minimum share price of individual assets.",
  },
  {
    id: 5,
    question: "Are my investments protected?",
    answer:
      "Yes. All assets are fully protected, ownership records are maintained, and we comply with regulatory requirements. However, like all investments, asset values can fluctuate based on market conditions.",
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  const answerRef = useRef(null);

  return (
    <div className={`faq-item${isOpen ? " open" : ""}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.question}</span>
        <svg className="faq-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/*
       * Smooth open/close using CSS grid trick:
       * grid-template-rows animates between 0fr and 1fr,
       * which smoothly reveals/hides the content without
       * needing JavaScript to measure heights.
       */}
      <div className="faq-answer" ref={answerRef} aria-hidden={!isOpen}>
        <div className="faq-answer-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (id) => setOpenIndex((prev) => (prev === id ? null : id));

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">

        <div className="faq-hdr">
          <div className="faq-eyebrow">
            <span className="faq-eyebrow-line" />
            FAQ
            <span className="faq-eyebrow-line" />
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-sub">Everything you need to know about investing with DIVY</p>
        </div>

        <div className="faq-list">
          {faqs.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openIndex === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}