'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { getUserFromToken } from '@/lib/auth';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const updateUserState = () => {
    try {
      const userInfo = getUserFromToken();
      if (userInfo) {
        setUser({ name: userInfo.name || 'User' });
      } else {
        setUser(null);
      }
    } catch (err) {
      // If token is invalid, clear it and set user to null
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    updateUserState();

    // Listen for changes in localStorage (when token is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        updateUserState();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleTokenUpdate = () => {
      updateUserState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('tokenUpdated', handleTokenUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tokenUpdated', handleTokenUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    location.reload();
  };

  return (
    <nav className="w-full px-6 py-4 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/" className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SkillSync
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            Skill Set
          </Link>
          <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            See Jobs
          </Link>
          <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            Build Teams
          </Link>
          <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
            Look for Projects
          </Link>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/profile">
                <span className="text-purple-400 font-semibold hover:text-purple-300 cursor-pointer transition-colors">
                  Hi, {user.name}
                </span>
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-400 border-red-400 hover:bg-red-500/10"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
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
            <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              Skill Set
            </Link>
            <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              See Jobs
            </Link>
            <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              Build Teams
            </Link>
            <Link href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 px-2 py-1">
              Look for Projects
            </Link>

            <div className="flex flex-col space-y-3 pt-4">
              {user ? (
                <>
                  <Link href="/profile">
                    <span className="text-purple-400 px-4 text-lg hover:text-purple-300 cursor-pointer transition-colors">
                      Hi, {user.name}
                    </span>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="text-red-400 border-red-400 hover:bg-red-500/10"
                    variant="outline"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <Button
                      variant="outline"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200 w-full"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
