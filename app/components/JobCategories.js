import React from 'react';
import { ArrowRight, Building2, Users, Briefcase } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] mix-blend-overlay opacity-20" />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Hero content */}
          <div className="text-center md:text-left md:max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Career Journey
              <span className="block text-blue-300">Starts Here</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Connect with top employers and find opportunities that match your ambitions. Your next big career move is just a click away.
            </p>

           

            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex items-center space-x-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <Briefcase className="text-blue-300" size={32} />
                <div>
                  <p className="text-3xl font-bold text-white">250K+</p>
                  <p className="text-blue-200">Active Jobs</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <Building2 className="text-blue-300" size={32} />
                <div>
                  <p className="text-3xl font-bold text-white">12K+</p>
                  <p className="text-blue-200">Companies</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <Users className="text-blue-300" size={32} />
                <div>
                  <p className="text-3xl font-bold text-white">5M+</p>
                  <p className="text-blue-200">Job Seekers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Hero;