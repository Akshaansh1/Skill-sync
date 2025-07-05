"use client";

import React, { useState } from 'react';
import { Skill } from '@/types/skills';
import { Plus } from 'lucide-react';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
}

const AddSkillModal = ({ isOpen, onClose, onAddSkill }: AddSkillModalProps) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Skill['level']>('Beginner');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && category.trim()) {
      onAddSkill({ name: name.trim(), level, category: category.trim() });
      setName('');
      setLevel('Beginner');
      setCategory('');
      onClose();
    }
  };

  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
    'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP',
    'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Sass',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Git', 'Linux', 'Bash', 'GraphQL', 'REST APIs'
  ];

  const categories = [
    'Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 
    'Database', 'Cloud', 'Language', 'Framework', 'Tools'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Plus className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Add New Skill</h2>
            <p className="text-gray-400 text-sm">Expand your skill profile</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Skill Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              placeholder="e.g., React, Python, Docker..."
              required
            />
            
            {/* Quick suggestions */}
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-1">
                {commonSkills.slice(0, 8).map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => setName(skill)}
                    className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg hover:bg-purple-500/30 transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Proficiency Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Skill['level'])}
              className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="Beginner">Beginner - Just getting started</option>
              <option value="Intermediate">Intermediate - Comfortable using it</option>
              <option value="Expert">Expert - Can teach others</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;