import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Star, Zap, Brain, Globe, Code } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  domain: string;
  collaborators: number;
  owner: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
}

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dummy user skill set - in a real app, this would come from user profile
  const userSkillSet = ['React', 'TypeScript', 'Python', 'Machine Learning', 'Node.js'];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const domains = ['All', 'AI', 'Web', 'Blockchain', 'IoT', 'Mobile'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Expert'];

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDomain = selectedDomain === 'All' || project.domain === selectedDomain;
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;

    return matchesSearch && matchesDomain && matchesDifficulty;
  });

  // Get suggested projects (those that match user skills)
  const suggestedProjects = filteredProjects.filter(project =>
    project.skills.some(skill => userSkillSet.includes(skill))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'AI': return <Brain className="w-4 h-4" />;
      case 'Web': return <Globe className="w-4 h-4" />;
      case 'Blockchain': return <Zap className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
      {project.featured && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2">
          <Star className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
            {project.owner.avatar}
          </div>
          <div>
            <p className="text-white/80 text-sm">{project.owner.name}</p>
            <div className="flex items-center space-x-1 text-white/60 text-xs">
              <Users className="w-3 h-3" />
              <span>{project.collaborators} collaborators</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {getDomainIcon(project.domain)}
          <span className="text-white/60 text-xs">{project.domain}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
        {project.title}
      </h3>

      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${userSkillSet.includes(skill)
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-white/10 text-white/80 border border-white/20'
              }`}
          >
            {skill}
          </span>
        ))}
        {project.skills.length > 4 && (
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-white/60 border border-white/10">
            +{project.skills.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
          {project.difficulty}
        </span>

        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          Join Project
        </button>
      </div>
    </div>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center">
        <div className="text-xl">Loading projects...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Discover Amazing Projects
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join collaborative projects, learn new skills, and build something incredible together
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-xl pl-10 pr-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
                  >
                    {domains.map(domain => (
                      <option key={domain} value={domain} className="bg-gray-900 text-white">
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty} className="bg-gray-900 text-white">
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Suggested Projects */}
        {suggestedProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-1 h-8 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-white">Suggested For You</h2>
              <div className="ml-4 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
                Based on your skills
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {suggestedProjects.slice(0, 6).map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div>
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-1 h-8 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">All Projects</h2>
            <div className="ml-4 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/60 text-sm">
              {filteredProjects.length} projects
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-white/60 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDomain('All');
                setSelectedDifficulty('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Start Your Own Project CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-cyan-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 animate-pulse"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Have an Amazing Idea?
              </h3>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Start your own project and collaborate with talented developers from around the world
              </p>
              <button
                onClick={() => {
                  // For now, show an alert. In the future, this could navigate to a create project page
                  alert('Create project functionality coming soon! This will allow you to start your own project.');
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 transform"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;