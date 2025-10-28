import React from 'react';
import { HeroSection } from '../Components/LandingPage/HeroSection';
import Features from '../Components/LandingPage/Features';
import FeaturedList from '../Components/LandingPage/FeaturedList';
import Testimonials from '../Components/LandingPage/Testimonials';
import Cta from '../Components/LandingPage/Cta';
import Faq from '../Components/LandingPage/Faq';
import './LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';

// Login Form Component
const LandingPage = () => {
    return (
        <div className="landing-page">
            <HeroSection />
            <Features />
            <FeaturedList />
            <Testimonials />
            <Cta />
            <Faq />
        </div>
    );
};

export default LandingPage;