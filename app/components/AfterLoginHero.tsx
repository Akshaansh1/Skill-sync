import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#0F172A] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Track Skills.{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Build Teams.
          </span>{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Power
          </span>{' '}
          Your Career.
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-[#94A3B8] mb-12 max-w-4xl mx-auto leading-relaxed">
          Connect with top developers, showcase your expertise, and join innovative projects that shape the future of technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/project">
            <button className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg min-w-[200px]">
              Look for Projects
            </button>
          </Link>

          <Link href="/skills">
            <button className="bg-gradient-to-r from-[#059669] to-[#0891B2] hover:from-[#047857] hover:to-[#0E7490] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg min-w-[200px]">
              Look for Skills
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;