import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="px-6 py-20 md:py-32">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Track Skills.{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Build Teams.
          </span>{" "}
          Power Your Career.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
          Connect with top developers, showcase your expertise, and join innovative projects that shape the future of technology.
        </p>
        
        <Button 
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
        >
          Get Started Today
        </Button>
      </div>
    </section>
  );
};

export default Hero;