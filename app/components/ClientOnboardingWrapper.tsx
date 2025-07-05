'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import OnboardingForm from './OnBoarding';

interface MyJWTPayload {
  id: string;
  email: string;
  name: string | null;
  isProfileCompleted: boolean;
  iat?: number;
  exp?: number;
}

export default function ClientOnboardingWrapper() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const checkProfileStatus = () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode<MyJWTPayload>(token);

        // Check if token is valid and not expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded && decoded.exp && decoded.exp > currentTime) {
          // Only show onboarding if user is authenticated AND profile is not completed
          if (!decoded.isProfileCompleted) {
            setShowOnboarding(true);
          } else {
            setShowOnboarding(false);
          }
        } else {
          // Token is expired or invalid, remove it and don't show onboarding
          localStorage.removeItem('token');
          setShowOnboarding(false);
        }
      } else {
        // No token means user is not authenticated, so don't show onboarding
        setShowOnboarding(false);
      }
    } catch (err) {
      console.error('Token decode error:', err);
      // If token is invalid, remove it and don't show onboarding
      localStorage.removeItem('token');
      setShowOnboarding(false);
    }
  };

  useEffect(() => {
    checkProfileStatus();

    // Listen for token updates
    const handleTokenUpdate = () => {
      checkProfileStatus();
    };

    window.addEventListener('tokenUpdated', handleTokenUpdate);

    return () => {
      window.removeEventListener('tokenUpdated', handleTokenUpdate);
    };
  }, []);

  const handleProfileComplete = () => {
    // Check the updated token to see if profile is now completed
    checkProfileStatus();
  };

  return showOnboarding ? (
    <OnboardingForm isOpen={true} onClose={handleProfileComplete} />
  ) : null;
}
