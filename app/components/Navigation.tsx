"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full px-6 py-4 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SkillSync
          </span>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            Skill Set
          </a>
          <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            See Jobs
          </a>
          <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            Build Teams
          </a>
          <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            Look for Projects
          </a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200 cursor-pointer"
          >
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 cursor-pointer">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 hover:bg-purple-500/10 rounded-md transition-colors duration-200"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20">
          <div className="flex flex-col space-y-4 pt-4">
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              Skill Set
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              See Jobs
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              Build Teams
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              Look for Projects
            </a>
            <div className="flex flex-col space-y-3 pt-4">
              <Button 
                variant="outline" 
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200 w-full"
              >
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;