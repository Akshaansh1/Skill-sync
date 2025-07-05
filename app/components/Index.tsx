import React from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

const Index = () => {
    return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <Navigation />
        <Hero />
        <Features />
        <Footer />
    </div>
);
};

export default Index;
