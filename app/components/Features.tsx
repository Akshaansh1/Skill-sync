"use client";

import React, { useState, useEffect } from 'react';

const Features = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    
    const codeLines = [
        "const developer = {",
        "  name: 'Alex Chen',",
        "  skills: ['React', 'Node.js', 'Python'],",
        "  experience: '5 years',",
        "  status: 'available'",
        "};",
        "",
        "// Join amazing teams",
        "const team = findPerfectMatch(developer);",
        "console.log('Welcome to SkillSync!');"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
        if (currentLine < codeLines.length) {
            if (currentChar < codeLines[currentLine].length) {
            setCurrentChar(prev => prev + 1);
            } else {
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
            }
        } else {
            // Reset animation
            setTimeout(() => {
            setCurrentLine(0);
            setCurrentChar(0);
            }, 2000);
        }
        }, 50);

        return () => clearInterval(timer);
    }, [currentLine, currentChar, codeLines]);

    const getDisplayedCode = () => {
        return codeLines.slice(0, currentLine + 1).map((line, index) => {
        if (index === currentLine) {
            return line.slice(0, currentChar);
        }
        return line;
        });
    };

    return (
        <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Code Animation */}
            <div className="order-2 md:order-1">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 font-mono text-sm">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 ml-4">developer.js</span>
                </div>
                <div className="text-green-400">
                    {getDisplayedCode().map((line, index) => (
                    <div key={index} className="leading-6">
                        {line}
                        {index === currentLine && (
                        <span className="animate-pulse bg-purple-400 w-2 h-5 inline-block ml-1"></span>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Feature Text */}
            <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold text-white mb-6">
                Built for{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Developers
                </span>
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                SkillSync understands the developer mindset. Track your technical expertise, 
                discover opportunities that match your skills, and connect with teams building 
                the next generation of software.
                </p>
                <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">Smart skill matching algorithm</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Real-time collaboration tools</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Project-based networking</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default Features;