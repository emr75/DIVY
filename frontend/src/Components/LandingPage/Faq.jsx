import React, { useState } from "react";
import "../../Pages/LandingPage.css";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="wrapper faq-wrapper" id="faq">
      <div className="section-header">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about investing with DIVY</p>
      </div>

      <div className="faq-container">
        {/* FAQ 1 */}
        <div className={`faq-item ${openIndex === 0 ? "open" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(0)}>
            <span>What is fractional ownership?</span>
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
            <p>
              Fractional ownership allows you to own a percentage of high-value assets by purchasing
              shares. Instead of buying an entire luxury condo or high-value stocks, you can invest
              in a portion and benefit from its appreciation and potential returns.
            </p>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className={`faq-item ${openIndex === 1 ? "open" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(1)}>
            <span>How do I start investing?</span>
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
            <p>
              Simply create an account, complete the verification process, browse available assets,
              and purchase shares starting from as little as $50. Your ownership is immediately
              recorded.
            </p>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className={`faq-item ${openIndex === 2 ? "open" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(2)}>
            <span>Can I sell my shares anytime?</span>
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
            <p>
              Yes! Our marketplace provides liquidity by allowing you to list and sell your shares
              at any time. Other investors can purchase your shares, giving you the flexibility to
              exit investments when needed.
            </p>
          </div>
        </div>

        {/* FAQ 4 */}
        <div className={`faq-item ${openIndex === 3 ? "open" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(3)}>
            <span>How are assets authenticated and stored?</span>
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
            <p>All assets are thoroughly vetted by industry experts before listing.</p>
          </div>
        </div>

        {/* FAQ 5 */}
        <div className={`faq-item ${openIndex === 4 ? "open" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(4)}>
            <span>What fees does DIVY charge?</span>
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
            <p>DIVY charges a 2% transaction fee when buying or selling shares.</p>
          </div>
        </div>

        {/* FAQ 6 */}
        <div className={`faq-item ${openIndex === 5 ? "open" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(5)}>
            <span>Are my investments protected?</span>
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
            <p>
              Yes. All assets are fully protected, ownership records are maintained, and we comply
              with regulatory requirements. However, like all investments, asset values can
              fluctuate based on market conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
