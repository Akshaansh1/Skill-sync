"use client";

import React from 'react';
import { Skill } from '@/types/skills';

interface ExpertDomainProps {
  skills: Skill[];
}

const ExpertDomain = ({ skills }: ExpertDomainProps) => {
  const expertSkills = skills.filter(skill => skill.level === 'Expert');
  const intermediateSkills = skills.filter(skill => skill.level === 'Intermediate');

  const getDomainTips = () => {
    const tips = [];
    
    if (expertSkills.length > 0) {
      tips.push({
        title: "Mentor Others",
        description: `Share your ${expertSkills[0].name} expertise through teaching or code reviews`,
        icon: "🎯"
      });
    }

    if (intermediateSkills.length > 0) {
      tips.push({
        title: "Build Advanced Projects",
        description: `Create complex applications using ${intermediateSkills[0].name} to reach expert level`,
        icon: "🚀"
      });
    }

    if (skills.length > 3) {
      tips.push({
        title: "Specialize Your Stack",
        description: "Focus on 2-3 core technologies to become a domain expert",
        icon: "⭐"
      });
    }

    // Default tips
    if (tips.length === 0) {
      tips.push(
        {
          title: "Practice Consistently",
          description: "Dedicate 30 minutes daily to skill development",
          icon: "📚"
        },
        {
          title: "Join Communities",
          description: "Connect with other developers in your field",
          icon: "👥"
        }
      );
    }

    return tips.slice(0, 3);
  };

  const tips = getDomainTips();

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-4">Excel in Your Domain</h2>
      
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="bg-black/40 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h3 className="text-white font-semibold mb-1">{tip.title}</h3>
                <p className="text-gray-400 text-sm">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {expertSkills.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🏆</span>
            <span className="text-white font-semibold">Expert Status</span>
          </div>
          <p className="text-gray-300 text-sm">
            You're an expert in {expertSkills.length} skill{expertSkills.length > 1 ? 's' : ''}! 
            Consider sharing your knowledge through mentoring or creating content.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpertDomain;