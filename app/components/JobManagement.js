'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, Plus, Edit2, Trash2, MapPin, Briefcase, Clock, Award } from 'lucide-react'
import EditJobForm from './EditJobForm'
import Loading from './Loading'
import { toast } from 'react-hot-toast'

export default function JobManagement() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingJobId, setDeletingJobId] = useState(null)

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
    } finally {
      setShowDeleteDialog(false)
      setDeletingJobId(null)
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and track all job postings
              </p>
            </div>
            
          </div>
        </div>
        
        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs available matching your search.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                        <Image
                          src={job.companyLogo || '/placeholder.svg'}
                          alt={job.companyName}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600">{job.companyName}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletingJobId(job._id)
                          setShowDeleteDialog(true)
                        }}
                        className="inline-flex items-center px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">{job.category}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{job.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{job.jobType}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Job</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false)
                  setDeletingJobId(null)
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingJobId)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}