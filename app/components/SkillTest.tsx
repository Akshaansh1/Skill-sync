"use client";

import React, { useState } from 'react';
import { Skill } from '@/types/skills';
import { TestTube } from 'lucide-react';

interface SkillTestProps {
  skills: Skill[];
  onSkillUpdate: (id: number, updates: Partial<Skill>) => void;
}

const SkillTest = ({ skills, onSkillUpdate }: SkillTestProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  const startTest = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsTestActive(true);
    setTestComplete(false);
  };

  const completeTest = (score: number) => {
    if (selectedSkill) {
      // Determine new level based on score
      let newLevel: Skill['level'] = 'Beginner';
      if (score >= 85) newLevel = 'Expert';
      else if (score >= 65) newLevel = 'Intermediate';

      onSkillUpdate(selectedSkill.id, { score, level: newLevel });
      setTestComplete(true);
      setTimeout(() => {
        setIsTestActive(false);
        setSelectedSkill(null);
        setTestComplete(false);
      }, 3000);
    }
  };

  const simulateTest = () => {
    // Simulate test completion with random score
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    completeTest(score);
  };

  if (isTestActive && selectedSkill) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <TestTube className="text-white" size={24} />
        </div>
        
        {testComplete ? (
          <div className="animate-scale-in">
            <h3 className="text-2xl font-bold text-white mb-2">Test Complete!</h3>
            <p className="text-green-400 text-lg mb-4">Great job on your {selectedSkill.name} assessment</p>
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-xl border border-green-500/30">
              Score: {selectedSkill.score}%
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Testing {selectedSkill.name}</h3>
            <p className="text-gray-400 mb-6">Validating your expertise...</p>
            <div className="bg-gray-700 rounded-full h-2 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <button 
              onClick={simulateTest}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
            >
              Complete Test
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <TestTube className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Validate Your Skills</h2>
        <p className="text-gray-400">Take assessments to prove your expertise and improve your skill ratings</p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Add some skills first to start testing!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-xs text-gray-400">Current: {skill.level}</span>
                {skill.score && (
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                    {skill.score}%
                  </span>
                )}
              </div>
              <button 
                onClick={() => startTest(skill)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform duration-200"
              >
                Test Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillTest;
