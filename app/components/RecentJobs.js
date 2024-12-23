import JobCard from './JobCard'
import { getRecentJobs } from '../lib/jobs'

export default async function RecentJobs() {
  try {
    const jobs = await getRecentJobs()

    if (!jobs.length) {
      return (
        <div className="text-center text-gray-500">
          No jobs available at the moment.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error in RecentJobs:', error)
    return (
      <div className="text-center text-red-500">
        Error loading jobs. Please try again later.
      </div>
    )
  }
}

