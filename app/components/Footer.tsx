import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-purple-500/20 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SkillSync
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Connecting developers with opportunities and teams worldwide. 
              Build your career, showcase your skills, and create amazing projects together.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">Contact</a>
              <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30">
                  <span className="text-sm">𝕏</span>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30">
                  <span className="text-sm">in</span>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30">
                  <span className="text-sm">gh</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © 2024 SkillSync. All rights reserved. Built for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;