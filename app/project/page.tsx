'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Projects from "../components/Projects";

const ProjectPage = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
            return;
        }
        
        setIsAuthenticated(true);
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to signin
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
            {/* Header with Navigation */}
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
                    
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/skills">
                            <span className="text-gray-300 hover:text-purple-400 cursor-pointer transition-colors">
                                Skills
                            </span>
                        </Link>
                        <Link href="/profile">
                            <span className="text-gray-300 hover:text-purple-400 cursor-pointer transition-colors">
                                Profile
                            </span>
                        </Link>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="text-red-400 border-red-400 hover:bg-red-500/10"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Projects Component */}
            <Projects />
        </div>
    );
};

export default ProjectPage;
