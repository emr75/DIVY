import React from 'react';
import '../../Pages/LandingPage.css';

export const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Real Estate Investor",
            avatar: "SC",
            rating: 5,
            text: "I've invested in both stocks and real estate for years, but DIVY offers something unique. I can now diversify into tangible luxury assets with the same ease as buying stocks, but with much better returns."
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            role: "Art Collector",
            avatar: "MR",
            rating: 5,
            text: "Traditional real estate requires huge capital and lacks liquidity. With DIVY, I get exposure to high-value assets without tying up hundreds of thousands, and I can sell my shares whenever I need to."
        },
        {
            id: 3,
            name: "Emily Thompson",
            role: "Tech Professional",
            avatar: "ET",
            rating: 5,
            text: "The investing functionality is seamless. I can buy and sell shares instantly, and the portfolio analytics help me track my returns. Highly recommend!"
        }
    ];

    return (
        <div className='wrapper testimonials-wrapper'>
            <div className="section-header">
                <h2 className="section-title">What Our Investors Say</h2>
                <p className="section-subtitle">
                    Join thousands of satisfied investors building wealth through fractional ownership
                </p>
            </div>
            <div className="testimonials-grid">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card">
                        <div className="testimonial-rating">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 1L12.5 6.5L18.5 7.5L14.25 11.5L15.25 17.5L10 14.5L4.75 17.5L5.75 11.5L1.5 7.5L7.5 6.5L10 1Z"/>
                                </svg>
                            ))}
                        </div>
                        <p className="testimonial-text">"{testimonial.text}"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">{testimonial.avatar}</div>
                            <div className="testimonial-info">
                                <div className="testimonial-name">{testimonial.name}</div>
                                <div className="testimonial-role">{testimonial.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;