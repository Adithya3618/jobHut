'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  MapPin,
  Briefcase,
  Building2,
  Clock,
  GraduationCap,
  Star,
  ExternalLink,
} from 'lucide-react';
import ApplyButton from './ApplyButton';

export default function JobCard({ job }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!job) return null;

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />
      </div>

      {/* Featured Badge */}
      {job.isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            <Star size={14} className="animate-pulse" />
            <span>Featured</span>
          </div>
        </div>
      )}

      <div className="relative p-6">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          {/* Company Logo */}
          <div className="relative mb-4 lg:mb-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border-2 border-gray-100 shadow-sm">
              <Image
                src={imageError ? '/placeholder.svg' : job.companyLogo || '/placeholder.svg'}
                alt={`${job.companyName || 'Company'} logo`}
                width={80}
                height={80}
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link
                  href={`/jobs/${job._id}`}
                  className="inline-block text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {job.title || 'Untitled Position'}
                </Link>
                <div className="flex items-center mt-1 space-x-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-gray-600">{job.companyName || 'Company Name Not Available'}</span>
                </div>
                
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                <Briefcase size={16} className="text-blue-700" />
                <span>{job.subCategory || 'Not Specified'}</span>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 lg:grid-cols-4 my-4">
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-500" />
                <span>{job.location || 'Location Not Specified'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase size={18} className="text-green-500" />
                <span>{job.salary ? `₹${job.salary}` : 'Salary Not Specified'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap size={18} className="text-purple-500" />
                <span>{job.experience || 'Experience Not Specified'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 mt-6">
              <Link
                href={`/jobs/${job._id}`}
                className="flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-100 transition-colors font-medium group"
              >
                <span>View Details</span>
                <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {job.applyLink && (
                <ApplyButton
                  applyLink={job.applyLink}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div
        className={`absolute inset-0 border-2 rounded-xl transition-colors duration-300 pointer-events-none ${isHovered ? 'border-blue-500' : 'border-gray-100'}`}
      />
    </div>
  );
}