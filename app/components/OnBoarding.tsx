import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';

interface OnboardingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  skillSet: string[];
  interestedJobRoles: string[];
  resume: File | null;
  shortBio: string;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    skillSet: [],
    interestedJobRoles: [],
    resume: null,
    shortBio: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newJobRole, setNewJobRole] = useState('');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skillSet.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillSet: [...prev.skillSet, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skillSet: prev.skillSet.filter(skill => skill !== skillToRemove)
    }));
  };

  const addJobRole = () => {
    if (newJobRole.trim() && !formData.interestedJobRoles.includes(newJobRole.trim())) {
      setFormData(prev => ({
        ...prev,
        interestedJobRoles: [...prev.interestedJobRoles, newJobRole.trim()]
      }));
      setNewJobRole('');
    }
  };

  const removeJobRole = (roleToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interestedJobRoles: prev.interestedJobRoles.filter(role => role !== roleToRemove)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (formData.skillSet.length === 0) {
      newErrors.skillSet = ['At least one skill is required'];
    }

    if (formData.interestedJobRoles.length === 0) {
      newErrors.interestedJobRoles = ['At least one job role is required'];
    }

    if (!formData.shortBio.trim()) {
      newErrors.shortBio = 'Short bio is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('skillSet', JSON.stringify(formData.skillSet));
      submitData.append('interestedJobRoles', JSON.stringify(formData.interestedJobRoles));
      submitData.append('shortBio', formData.shortBio);

      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/auth/profile/complete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit profile');
      }

      const result = await response.json();
      console.log('Profile updated successfully:', result);

      // Update the token in localStorage with the new token that has isProfileCompleted: true
      if (result.token) {
        localStorage.setItem('token', result.token);
        // Dispatch custom event to notify other components about token update
        window.dispatchEvent(new Event('tokenUpdated'));
      }

      // Close modal on success
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-lg shadow-xl p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
          <p className="text-gray-400">Tell us about yourself to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 focus:outline-none"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
            )}
          </div>

          {/* Skill Set */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skill Set *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-3 py-2 bg-gray-900/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 focus:outline-none"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skillSet.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-purple-400 hover:text-purple-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.skillSet && (
              <p className="mt-1 text-sm text-red-400">At least one skill is required</p>
            )}
          </div>

          {/* Interested Job Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Interested Job Roles *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newJobRole}
                onChange={(e) => setNewJobRole(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addJobRole())}
                className="flex-1 px-3 py-2 bg-gray-900/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 focus:outline-none"
                placeholder="Add a job role"
              />
              <button
                type="button"
                onClick={addJobRole}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.interestedJobRoles.map((role, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300"
                >
                  {role}
                  <button
                    type="button"
                    onClick={() => removeJobRole(role)}
                    className="text-blue-400 hover:text-blue-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.interestedJobRoles && (
              <p className="mt-1 text-sm text-red-400">At least one job role is required</p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
              Resume Upload
            </label>
            <div className="relative">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-purple-500/30 rounded-md text-gray-400 hover:border-purple-400 transition-colors cursor-pointer">
                <Upload className="h-4 w-4" />
                <span>
                  {formData.resume ? formData.resume.name : 'Choose file...'}
                </span>
              </div>
            </div>
          </div>

          {/* Short Bio */}
          <div>
            <label htmlFor="shortBio" className="block text-sm font-medium text-gray-300 mb-2">
              Short Bio *
            </label>
            <textarea
              id="shortBio"
              name="shortBio"
              value={formData.shortBio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-900/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 focus:outline-none resize-none"
              placeholder="Tell us about yourself..."
            />
            {errors.shortBio && (
              <p className="mt-1 text-sm text-red-400">{errors.shortBio}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium rounded-md shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;