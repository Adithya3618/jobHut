'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase, Award, Banknote } from 'lucide-react';

export default function SearchForm() {
  const [filters, setFilters] = useState({
    keyword: '',
    salary: '',
    experience: '',
    location: '',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value)
    );
    router.push(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
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
              placeholder="Search jobs (e.g., 'Software Engineer', 'Marketing Manager')"
              className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              onFocus={() => setIsExpanded(true)}
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={24}
            />
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <div className="flex items-center space-x-1">
                <span className="text-sm">
                  {isExpanded ? 'Less filters' : 'More filters'}
                </span>
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
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}
          >
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/4 -translate-y-1/2 text-gray-400"
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
                className="absolute left-4 top-1/4 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="salary"
                value={filters.salary}
                onChange={handleChange}
                placeholder="Salary Range"
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Award
                className="absolute left-4 top-1/4 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="experience"
                value={filters.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
