"use client";

import React from 'react';
import { Skill, RecommendedSkill } from '@/types/skills';
import { Plus } from 'lucide-react';

interface RecommendedSkillsProps {
  currentSkills: Skill[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
}

const RecommendedSkills = ({ currentSkills, onAddSkill }: RecommendedSkillsProps) => {
  // Generate recommendations based on current skills
  const generateRecommendations = (): RecommendedSkill[] => {
    const recommendations: RecommendedSkill[] = [];
    const skillNames = currentSkills.map(s => s.name.toLowerCase());

    // Frontend recommendations
    if (skillNames.includes('react')) {
      if (!skillNames.includes('next.js')) {
        recommendations.push({
          name: 'Next.js',
          category: 'Frontend',
          reason: 'Perfect complement to React',
          tag: 'Recommended',
          difficulty: 'Medium'
        });
      }
      if (!skillNames.includes('tailwind css')) {
        recommendations.push({
          name: 'Tailwind CSS',
          category: 'Frontend',
          reason: 'Popular styling framework',
          tag: 'Trending',
          difficulty: 'Easy'
        });
      }
    }

    // Backend recommendations
    if (skillNames.includes('python')) {
      if (!skillNames.includes('django')) {
        recommendations.push({
          name: 'Django',
          category: 'Backend',
          reason: 'Python web framework',
          tag: 'Recommended',
          difficulty: 'Medium'
        });
      }
      if (!skillNames.includes('fastapi')) {
        recommendations.push({
          name: 'FastAPI',
          category: 'Backend',
          reason: 'Modern Python API framework',
          tag: 'In Demand',
          difficulty: 'Medium'
        });
      }
    }

    // DevOps recommendations
    if (skillNames.includes('docker')) {
      if (!skillNames.includes('kubernetes')) {
        recommendations.push({
          name: 'Kubernetes',
          category: 'DevOps',
          reason: 'Next step after Docker',
          tag: 'In Demand',
          difficulty: 'Hard'
        });
      }
    }

    // General recommendations
    if (!skillNames.includes('git')) {
      recommendations.push({
        name: 'Git',
        category: 'Tools',
        reason: 'Essential for any developer',
        tag: 'Recommended',
        difficulty: 'Easy'
      });
    }

    if (!skillNames.includes('aws')) {
      recommendations.push({
        name: 'AWS',
        category: 'Cloud',
        reason: 'Most popular cloud platform',
        tag: 'In Demand',
        difficulty: 'Hard'
      });
    }

    return recommendations.slice(0, 4); // Limit to 4 recommendations
  };

  const recommendations = generateRecommendations();

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Recommended': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'In Demand': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Trending': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-4">Recommended Skills</h2>
      
      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Add more skills to get personalized recommendations!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-black/40 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold">{rec.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border ${getTagColor(rec.tag)}`}>
                  {rec.tag}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-3">{rec.reason}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">{rec.category}</span>
                  <span className="text-gray-500">•</span>
                  <span className={getDifficultyColor(rec.difficulty)}>{rec.difficulty}</span>
                </div>
                
                <button 
                  onClick={() => onAddSkill({
                    name: rec.name,
                    level: 'Beginner',
                    category: rec.category
                  })}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:scale-105 transition-transform duration-200 flex items-center gap-1 opacity-0 group-hover:opacity-100"
                >
                  <Plus size={12} />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedSkills;
