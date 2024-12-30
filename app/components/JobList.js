import JobCard from './JobCard'
import { searchJobs } from '../lib/jobs'

export default async function JobList({ searchParams }) {
  try {
    // Ensure searchParams is resolved
    const params = await searchParams;
    
    console.log('Search params:', params); // For debugging

    const jobs = await searchJobs(params);

    if (!jobs.length) {
      return (
        <div className="text-center text-gray-500 py-8">
          No jobs found matching your criteria.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error in JobList:', error);
    return (
      <div className="text-center text-red-500">
        Error loading jobs. Please try again later.
      </div>
    );
  }
}

