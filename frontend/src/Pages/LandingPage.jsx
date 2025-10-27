import React, { useState, useEffect } from 'react';
import { HeroSection } from '../Components/LandingPage/HeroSection';
import Features from '../Components/LandingPage/Features';
import FeaturedList from '../Components/LandingPage/FeaturedList';
import Testimonials from '../Components/LandingPage/Testimonials';
import Cta from '../Components/LandingPage/Cta';
import Faq from '../Components/LandingPage/Faq';
import './LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Login Form Component
const LandingPage = () => {

    // simple ping function to test backend connection
    const [pingResponse, setPingResponse] = useState(null);

    useEffect(() => {
        fetchPing();
    }, []);

    const fetchPing = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/ping');
            setPingResponse(response.data.message);
        } catch (error) {
            console.error('Error fetching ping:', error);
        }
    };
    // end ping function 

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