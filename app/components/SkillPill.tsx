"use client";

import React, { useState } from 'react';
import { Skill } from '@/types/skills';
import { Edit, Plus } from 'lucide-react';

interface SkillPillProps {
  skill: Skill;
  onRemove: () => void;
  onUpdate: (updates: Partial<Skill>) => void;
}

const SkillPill = ({ skill, onRemove, onUpdate }: SkillPillProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(skill.name);
  const [editLevel, setEditLevel] = useState(skill.level);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Expert': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleSave = () => {
    onUpdate({ name: editName, level: editLevel as Skill['level'] });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(skill.name);
    setEditLevel(skill.level);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-black/50 border border-purple-500/30 rounded-xl p-3 flex items-center gap-2 min-w-fit">
        <input 
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="bg-transparent text-white text-sm font-medium outline-none min-w-0 flex-1"
          autoFocus
        />
        <select 
          value={editLevel}
          onChange={(e) => setEditLevel(e.target.value as Skill['level'])}
          className="bg-black/50 text-white text-xs rounded px-2 py-1 border border-purple-500/30"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
        <button 
          onClick={handleSave}
          className="text-green-400 hover:text-green-300 text-xs"
        >
          Save
        </button>
        <button 
          onClick={handleCancel}
          className="text-red-400 hover:text-red-300 text-xs"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="group bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-3 flex items-center gap-3 hover:border-purple-500/40 transition-all duration-200 hover:scale-105">
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(skill.level)}`}>
          {skill.level}
        </span>
        {skill.score && (
          <span className="text-xs text-gray-400">
            {skill.score}%
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsEditing(true)}
          className="text-purple-400 hover:text-purple-300 p-1"
        >
          <Edit size={12} />
        </button>
        <button 
          onClick={onRemove}
          className="text-red-400 hover:text-red-300 p-1 rotate-45"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
};

export default SkillPill;
