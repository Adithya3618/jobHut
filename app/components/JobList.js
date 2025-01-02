'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import JobCard from './JobCard';
import Loading from './Loading';

export default function JobList({ currentPage, jobsPerPage }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(searchParams);
        queryParams.set('page', currentPage.toString());
        queryParams.set('limit', jobsPerPage.toString());
        
        const response = await fetch(`/api/jobs?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data.jobs || []);
        setJobs(prevJobs => [...prevJobs].sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)));
        setTotalJobs(data.total || 0);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
        setTotalJobs(0);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams, currentPage, jobsPerPage]);

  if (loading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No jobs found.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
      <div className="mt-4 text-center text-gray-600">
        Showing {(currentPage - 1) * jobsPerPage + 1} - {Math.min(currentPage * jobsPerPage, totalJobs)} of {totalJobs} jobs
      </div>
    </div>
  );
}

