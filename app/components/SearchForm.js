'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase, Award, Banknote, GraduationCap, Building2, X } from 'lucide-react';

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

const EXPERIENCE_LEVELS = [
  { value: 'pursuing', label: 'Currently Pursuing' },
  { value: 'fresher', label: 'Fresher' },
  { value: '1-3', label: '1-3 Years' },
  { value: '3-5', label: '3-5 Years' },
  { value: '5+', label: '5+ Years' },
  { value: 'other', label: 'Other' }
];

const JOB_TYPES = [
  { value: 'intern', label: 'Internship' },
  { value: 'fulltime', label: 'Full Time' },
  { value: 'intern+full', label: 'Intern + Full Time' },
  { value: 'parttime', label: 'Part Time' },
  { value: 'contract', label: 'Contract' }
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
  const [activeFilters, setActiveFilters] = useState(0);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilter = (filterName) => {
    setFilters((prev) => ({ ...prev, [filterName]: '' }));
  };

  const handleClearAll = () => {
    setFilters({
      keyword: '',
      location: '',
      salary: '',
      experience: '',
      category: '',
      subCategory: '',
      jobType: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });
    router.push(`/jobs?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (filters.category) {
      setIsExpanded(true);
    }
    setFilters(prev => ({ ...prev, subCategory: '' }));
  }, [filters.category]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlFilters = {};
    searchParams.forEach((value, key) => {
      urlFilters[key] = value;
    });
    setFilters(prev => ({ ...prev, ...urlFilters }));
  }, []);

  useEffect(() => {
    const count = Object.values(filters).filter(Boolean).length;
    setActiveFilters(count);
  }, [filters]);

  const renderFilterBadge = (count) => {
    if (count === 0) return null;
    return (
      <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {count}
      </span>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
      >
        {/* Main Search Bar */}
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleChange}
              placeholder="Search jobs, companies, or keywords..."
              className="w-full pl-12 pr-24 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              onFocus={() => setIsExpanded(true)}
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={24}
            />
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 font-medium"
            >
              <div className="flex items-center space-x-1 relative">
                <span className="text-sm">
                  {isExpanded ? 'Less filters' : 'More filters'}
                </span>
                {renderFilterBadge(activeFilters)}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
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
            className={`space-y-6 transition-all duration-300 ${
              isExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            {/* Active Filters */}
            {activeFilters > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm"
                    >
                      <span className="capitalize">{key}: {value}</span>
                      <button
                        type="button"
                        onClick={() => handleClearFilter(key)}
                        className="hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  );
                })}
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Banknote
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  name="salary"
                  value={filters.salary}
                  onChange={handleChange}
                  placeholder="Minimum Salary"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Award
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Experience Level</option>
                  {EXPERIENCE_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Building2
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="technical">Technical</option>
                  <option value="non-technical">Non-Technical</option>
                </select>
              </div>

              <div className="relative">
                <GraduationCap
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  name="subCategory"
                  value={filters.subCategory}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white"
                  disabled={!filters.category}
                >
                  <option value="">Select Field</option>
                  {filters.category && (filters.category === 'technical' ? TECHNICAL_FIELDS : NON_TECHNICAL_FIELDS).map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Briefcase
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Job Type</option>
                  {JOB_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center space-x-3 font-medium shadow-lg hover:shadow-xl"
          >
            <Search size={20} />
            <span>Search Jobs</span>
          </button>
        </div>
      </form>
    </div>
  );
}

