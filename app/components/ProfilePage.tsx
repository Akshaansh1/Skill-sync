import React, { useState, useRef } from 'react';
import { X, Plus, Edit, Download, Upload, Save, XCircle, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserProfile {
    id: string;
    email: string;
    name: string;
    skills: string[];
    jobInterests: string[];
    bio: string;
    resumeUrl: string;
    isProfileCompleted: boolean;
}

interface ProfilePageProps {
    userProfile: UserProfile;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: userProfile.name || 'User',
        profilePicture: null as string | null,
        skills: userProfile.skills || [],
        jobInterests: userProfile.jobInterests || [],
        shortBio: userProfile.bio || '',
        resume: null as File | null,
        resumeFileName: userProfile.resumeUrl ? 'resume.pdf' : 'No resume uploaded'
    });

    const [editData, setEditData] = useState(profileData);
    const [newSkill, setNewSkill] = useState('');
    const [newJobInterest, setNewJobInterest] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resumeInputRef = useRef<HTMLInputElement>(null);

    const handleEdit = () => {
        setEditData({ ...profileData });
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            // Create FormData for the update
            const formData = new FormData();
            formData.append('fullName', editData.fullName);
            formData.append('skillSet', JSON.stringify(editData.skills));
            formData.append('interestedJobRoles', JSON.stringify(editData.jobInterests));
            formData.append('shortBio', editData.shortBio);

            if (editData.resume) {
                formData.append('resume', editData.resume);
            }

            const response = await fetch('/api/auth/profile/complete', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();

            // Update the token if a new one is provided
            if (result.token) {
                localStorage.setItem('token', result.token);
                window.dispatchEvent(new Event('tokenUpdated'));
            }

            setProfileData({ ...editData });
            setIsEditing(false);

            // Refresh the page to show updated data
            window.location.reload();
        } catch (error) {
            console.error('Error saving profile:', error);
            // You might want to show an error message to the user
        }
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setIsEditing(false);
        setNewSkill('');
        setNewJobInterest('');
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setEditData(prev => ({ ...prev, profilePicture: imageUrl }));
        }
    };

    const handleRemoveProfilePicture = () => {
        setEditData(prev => ({ ...prev, profilePicture: null }));
    };

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditData(prev => ({
                ...prev,
                resume: file,
                resumeFileName: file.name
            }));
        }
    };

    const addSkill = () => {
        if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
            setEditData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setEditData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const addJobInterest = () => {
        if (newJobInterest.trim() && !editData.jobInterests.includes(newJobInterest.trim())) {
            setEditData(prev => ({
                ...prev,
                jobInterests: [...prev.jobInterests, newJobInterest.trim()]
            }));
            setNewJobInterest('');
        }
    };

    const removeJobInterest = (interestToRemove: string) => {
        setEditData(prev => ({
            ...prev,
            jobInterests: prev.jobInterests.filter(interest => interest !== interestToRemove)
        }));
    };

    const downloadResume = () => {
        if (userProfile.resumeUrl) {
            // Create a temporary link to download the file
            const link = document.createElement('a');
            link.href = userProfile.resumeUrl;
            link.download = 'resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const currentData = isEditing ? editData : profileData;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <div className={`bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500 ${isEditing ? 'bg-black/30 border-purple-500/30' : ''}`}>

                    {/* Header with Edit Button */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="relative group">
                                <Avatar className="w-24 h-24 ring-4 ring-purple-500/20 transition-all duration-300 group-hover:ring-purple-500/40">
                                    <AvatarImage
                                        src={currentData.profilePicture || undefined}
                                        alt="Profile picture"
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-2xl font-bold">
                                        <User className="w-12 h-12" />
                                    </AvatarFallback>
                                </Avatar>

                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="p-2 bg-purple-600/80 rounded-full hover:bg-purple-600 transition-colors"
                                            >
                                                <Upload className="w-4 h-4 text-white" />
                                            </button>
                                            {currentData.profilePicture && (
                                                <button
                                                    onClick={handleRemoveProfilePicture}
                                                    className="p-2 bg-red-600/80 rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </div>

                            <div>
                                {isEditing ? (
                                    <Input
                                        value={editData.fullName}
                                        onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                                        className="text-3xl font-bold bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400"
                                        placeholder="Enter your name"
                                    />
                                ) : (
                                    <h1 className="text-3xl font-bold text-white">{currentData.fullName}</h1>
                                )}
                                <p className="text-purple-300 mt-1">SkillSync Developer</p>
                            </div>
                        </div>

                        {!isEditing ? (
                            <Button
                                onClick={handleEdit}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        ) : (
                            <div className="flex space-x-3">
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Skills Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {currentData.skills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    className="bg-purple-600/20 text-purple-300 border-purple-500/30 px-3 py-1 hover:bg-purple-600/30 transition-colors"
                                >
                                    {skill}
                                    {isEditing && (
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="ml-2 text-purple-400 hover:text-purple-200"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </Badge>
                            ))}
                            {isEditing && (
                                <div className="flex items-center space-x-2">
                                    <Input
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                        placeholder="Add skill"
                                        className="w-32 bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400/50"
                                    />
                                    <Button
                                        onClick={addSkill}
                                        size="sm"
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Job Interests Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Job Interests</h2>
                        <div className="flex flex-wrap gap-2">
                            {currentData.jobInterests.map((interest, index) => (
                                <Badge
                                    key={index}
                                    className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-3 py-1 hover:bg-blue-600/30 transition-colors"
                                >
                                    {interest}
                                    {isEditing && (
                                        <button
                                            onClick={() => removeJobInterest(interest)}
                                            className="ml-2 text-blue-400 hover:text-blue-200"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </Badge>
                            ))}
                            {isEditing && (
                                <div className="flex items-center space-x-2">
                                    <Input
                                        value={newJobInterest}
                                        onChange={(e) => setNewJobInterest(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addJobInterest()}
                                        placeholder="Add job interest"
                                        className="w-40 bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400/50"
                                    />
                                    <Button
                                        onClick={addJobInterest}
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                        {isEditing ? (
                            <Textarea
                                value={editData.shortBio}
                                onChange={(e) => setEditData(prev => ({ ...prev, shortBio: e.target.value }))}
                                className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 min-h-[120px] resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        ) : (
                            <p className="text-gray-300 leading-relaxed">{currentData.shortBio}</p>
                        )}
                    </div>

                    {/* Resume Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Resume</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <Download className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        {userProfile.resumeUrl ? 'resume.pdf' : 'No resume uploaded'}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {userProfile.resumeUrl ? 'PDF Document' : 'Upload your resume'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                {!isEditing && userProfile.resumeUrl && (
                                    <Button
                                        onClick={downloadResume}
                                        variant="outline"
                                        size="sm"
                                        className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20 hover:text-purple-200"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                )}

                                {isEditing && (
                                    <Button
                                        onClick={() => resumeInputRef.current?.click()}
                                        size="sm"
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {userProfile.resumeUrl ? 'Upload New' : 'Upload Resume'}
                                    </Button>
                                )}
                            </div>

                            <input
                                ref={resumeInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
