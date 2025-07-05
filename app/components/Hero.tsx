'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import AfterLoginHero from './AfterLoginHero';
import { getUserFromToken } from '@/lib/auth';

const Hero = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userInfo = getUserFromToken();
        if (userInfo) {
          setUser({ name: userInfo.name || 'User' });
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for token updates
    const handleTokenUpdate = () => {
      checkAuth();
    };

    window.addEventListener('tokenUpdated', handleTokenUpdate);

    return () => {
      window.removeEventListener('tokenUpdated', handleTokenUpdate);
    };
  }, []);

  // Show loading state briefly
  if (loading) {
    return (
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  // Show AfterLoginHero if user is authenticated
  if (user) {
    return <AfterLoginHero />;
  }

  // Show original hero for non-authenticated users
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

        <Link href="/signup">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;