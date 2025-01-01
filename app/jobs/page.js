'use client'

import { useState } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JobList from '../components/JobList';
import AdvancedSearch from '../components/AdvancedSearch';
import Loading from '../components/Loading';

export default function Jobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 20;
  const searchParams = useSearchParams();

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Job Listings</h1>
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left side: Search Form */}
          <div className="w-full lg:w-1/4">
            <Suspense fallback={<Loading />}>
              <AdvancedSearch />
            </Suspense>
          </div>
          
          {/* Right side: Job List */}
          <div className="w-full lg:w-3/4">
            <Suspense fallback={<Loading />}>
              <JobList 
                currentPage={currentPage}
                jobsPerPage={jobsPerPage}
              />
            </Suspense>
            
            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

