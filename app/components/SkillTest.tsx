"use client";

import React from 'react';
import { Skill } from '@/types/skills';
import { TestTube } from 'lucide-react';

interface SkillTestProps {
  skills: Skill[];
  onSkillUpdate: (id: number, updates: Partial<Skill>) => void;
}

const SkillTest = ({ skills, onSkillUpdate }: SkillTestProps) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <TestTube className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Skills Validation</h2>
        <p className="text-gray-400">Your skills from the onboarding form are displayed below</p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Complete your profile to see your skills here!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-xs text-gray-400">Level: {skill.level}</span>
                {skill.score && (
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                    {skill.score}%
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {skill.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillTest;
