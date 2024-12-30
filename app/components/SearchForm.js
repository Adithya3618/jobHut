'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase, Award, Banknote } from 'lucide-react';

const TECHNICAL_FIELDS = [
  'Software Developer',
  'Data Analyst',
  'Web Developer',
  'DevOps Engineer',
  'System Engineer',
  'Data Scientist',
  'QA Engineer',
  'Other'
];

const NON_TECHNICAL_FIELDS = [
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Customer Support',
  'Other'
];

export default function SearchForm() {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    salary: '',
    experience: '',
    category: '',
    subCategory: '',
    jobType: '',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    // Directly navigate when category is selected
    router.push(`/jobs?category=${category}`);
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? '' : category
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value)
    );
    router.push(`/jobs?${searchParams.toString()}`);
  };

  useEffect(() => {
    setFilters(prev => ({ ...prev, subCategory: '' }));
  }, [filters.category]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-4 sm:p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl"
      >
        {/* Main Search Bar */}
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <div className="relative group">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleChange}
              placeholder="Search jobs, companies, fields..."
              className="w-full pl-12 sm:pl-14 pr-12 py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
              onFocus={() => setIsExpanded(true)}
            />
            <Search
              className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
              size={20}
            />
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
            >
              <div className="flex items-center space-x-1">
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Expanded Search Options */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 transition-all duration-500 ease-in-out ${
              isExpanded ? 'opacity-100 max-h-[1000px] translate-y-0' : 'opacity-0 max-h-0 -translate-y-4 overflow-hidden'
            }`}
          >
            <div className="relative group">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                size={18}
              />
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div className="relative group">
              <Award
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                size={18}
              />
              <select
                name="experience"
                value={filters.experience}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white cursor-pointer"
              >
                <option value="">Experience Level</option>
                <option value="pursuing">Pursuing</option>
                <option value="fresher">Fresher</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative group">
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white cursor-pointer"
              >
                <option value="">Job Type</option>
                <option value="intern">Intern</option>
                <option value="fulltime">Full Time</option>
                <option value="intern+full">Intern + Full Time</option>
                <option value="parttime">Part Time</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:justify-between">
          {/* Category Buttons */}
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleCategorySelect('technical')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 ${
                filters.category === 'technical'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Briefcase size={18} />
              <span className="font-medium text-sm sm:text-base">Technical</span>
            </button>
            <button
              type="button"
              onClick={() => handleCategorySelect('non-technical')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 ${
                filters.category === 'non-technical'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Briefcase size={18} />
              <span className="font-medium text-sm sm:text-base">Non-Technical</span>
            </button>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search size={18} />
            <span className="font-medium text-sm sm:text-base">Search Jobs</span>
          </button>
        </div>
      </form>
    </div>
  );
}