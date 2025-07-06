"use client";

import React, { useState, useEffect } from 'react';
import CurrentSkills from './CurrentSkills';
import SkillTest from './SkillTest';
import RecommendedSkills from './RecommendedSkills';
import ExpertDomain from './ExpertDomain';
import AddSkillModal from './AddSkillModal';
import { Skill } from '@/types/skills';

const SkillsDashboard = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/skills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }

      const data = await response.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now() };
    setSkills([...skills, newSkill]);
  };

  const refreshSkills = () => {
    setLoading(true);
    setError(null);
    fetchSkills();
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: number, updates: Partial<Skill>) => {
    setSkills(skills.map(skill =>
      skill.id === id ? { ...skill, ...updates } : skill
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your skills...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchSkills}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="pt-20 pb-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-between items-center mb-6">
              <div></div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                Skill Development Hub
              </h1>
              <button
                onClick={refreshSkills}
                className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-400 rounded-md hover:bg-purple-600/30 transition-colors"
                title="Refresh skills from profile"
              >
                Refresh
              </button>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Track your expertise, validate your knowledge, and accelerate your growth with AI-powered recommendations
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {skills.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-4">No Skills Found</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Complete your profile in the onboarding form to see your skills here, or add skills manually.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={refreshSkills}
                  className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Refresh from Profile
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Skills Manually
                </button>
              </div>
            </div>
          ) : (
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
          )}
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