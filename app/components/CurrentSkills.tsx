"use client";

import React from 'react';
import { Skill } from '@/types/skills';
import SkillPill from './SkillPill';
import { Plus } from 'lucide-react';

interface CurrentSkillsProps {
  skills: Skill[];
  onRemoveSkill: (id: number) => void;
  onUpdateSkill: (id: number, updates: Partial<Skill>) => void;
  onAddSkill: () => void;
}

const CurrentSkills = ({ skills, onRemoveSkill, onUpdateSkill, onAddSkill }: CurrentSkillsProps) => {
  if (skills.length === 0) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">Your Skills</h2>
        <div className="py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="text-white" size={24} />
          </div>
          <p className="text-gray-400 mb-6">No skills added yet. Start building your profile!</p>
          <button 
            onClick={onAddSkill}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
          >
            Add Your First Skill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Your Skills</h2>
        <button 
          onClick={onAddSkill}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillPill 
            key={skill.id}
            skill={skill}
            onRemove={() => onRemoveSkill(skill.id)}
            onUpdate={(updates) => onUpdateSkill(skill.id, updates)}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrentSkills;