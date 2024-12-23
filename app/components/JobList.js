import JobCard from './JobCard'
import { searchJobs } from '../lib/jobs'

export default async function JobList({ searchParams }) {
  try {
    const jobs = await searchJobs(searchParams)

    if (!jobs.length) {
      return (
        <div className="text-center text-gray-500 py-8">
          No jobs found matching your criteria.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error in JobList:', error)
    return (
      <div className="text-center text-red-500">
        Error loading jobs. Please try again later.
      </div>
    )
  }
}

