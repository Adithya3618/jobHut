'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import EditJobForm from './EditJobForm'
import Loading from './Loading'
import { toast } from 'react-hot-toast'

export default function JobManagement() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/jobs')
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      const data = await response.json()
      setJobs(data.jobs.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)))
    } catch (error) {
      console.error('Error fetching jobs:', error)
      toast.error('Failed to load jobs. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) return

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })

      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== jobId))
        toast.success('Job deleted successfully')
      } else {
        throw new Error('Failed to delete job')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      toast.error('Error deleting job')
    }
  }

  const handleEdit = (job) => {
    setEditingJob(job)
  }

  const handleEditSubmit = async (updatedJob) => {
    try {
      const response = await fetch(`/api/jobs/${updatedJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updatedJob)
      })

      if (response.ok) {
        setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job))
        setEditingJob(null)
        toast.success('Job updated successfully')
      } else {
        throw new Error('Failed to update job')
      }
    } catch (error) {
      console.error('Error updating job:', error)
      toast.error('Error updating job')
    }
  }

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading />

  if (editingJob) {
    return <EditJobForm job={editingJob} onSubmit={handleEditSubmit} onCancel={() => setEditingJob(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {filteredJobs.length === 0 ? (
        <div className="text-center">No jobs available.</div>
      ) : (
        filteredJobs.map((job) => (
          <div key={job._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={job.companyLogo || '/placeholder.svg'}
                    alt={job.companyName}
                    width={64}
                    height={64}
                    className="rounded-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.companyName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Location: {job.location}</p>
                <p className="text-sm text-gray-600">Category: {job.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Experience: {job.experience}</p>
                <p className="text-sm text-gray-600">Job Type: {job.jobType}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

