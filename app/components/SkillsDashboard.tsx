"use client";

import React, { useState } from 'react';
import CurrentSkills from './CurrentSkills';
import SkillTest from './SkillTest';
import RecommendedSkills from './RecommendedSkills';
import ExpertDomain from './ExpertDomain';
import AddSkillModal from './AddSkillModal';
import { Skill } from '@/types/skills';

const SkillsDashboard = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'React', level: 'Expert', category: 'Frontend', score: 95 },
    { id: 2, name: 'TypeScript', level: 'Intermediate', category: 'Language', score: 78 },
    { id: 3, name: 'Python', level: 'Expert', category: 'Backend', score: 92 },
    { id: 4, name: 'Docker', level: 'Beginner', category: 'DevOps', score: 45 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now() };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: number, updates: Partial<Skill>) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, ...updates } : skill
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="pt-20 pb-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Skill Development Hub
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Track your expertise, validate your knowledge, and accelerate your growth with AI-powered recommendations
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Current Skills */}
            <div className="lg:col-span-2 space-y-8">
              <CurrentSkills 
                skills={skills}
                onRemoveSkill={removeSkill}
                onUpdateSkill={updateSkill}
                onAddSkill={() => setShowAddModal(true)}
              />
              <SkillTest skills={skills} onSkillUpdate={updateSkill} />
            </div>

            {/* Right Column - Recommendations & Tips */}
            <div className="space-y-8">
              <RecommendedSkills currentSkills={skills} onAddSkill={addSkill} />
              <ExpertDomain skills={skills} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Modal */}
      <AddSkillModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddSkill={addSkill}
      />
    </div>
  );
};

export default SkillsDashboard;