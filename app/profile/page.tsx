'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ProfilePageComponent from '../components/ProfilePage';

interface UserProfile {
    id: string;
    email: string;
    name: string;
    skills: string[];
    jobInterests: string[];
    bio: string;
    resumeUrl: string;
    isProfileCompleted: boolean;
}

const ProfilePage = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/signin');
                    return;
                }

                const response = await fetch('/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        router.push('/signin');
                        return;
                    }
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setProfile(data.user);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center">
                <div className="text-red-400 text-xl">{error}</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center">
                <div className="text-white text-xl">Profile not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
            {/* Header */}
            <div className="w-full px-6 py-4 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                        <div className="text-2xl font-bold text-white">
                            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                SkillSync
                            </span>
                        </div>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="text-red-400 border-red-400 hover:bg-red-500/10"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Profile Component */}
            <ProfilePageComponent userProfile={profile} />
        </div>
    );
};

export default ProfilePage; 