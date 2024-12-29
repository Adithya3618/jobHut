'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TECHNICAL_FIELDS = [
  'Software Developer',
  'Data Analyst',
  'Web Developer',
  'DevOps Engineer',
  'System Engineer',
  'Data Scientist',
  'QA Engineer',
  'Other'
]

const NON_TECHNICAL_FIELDS = [
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Customer Support',
  'Other'
]

export default function AddJobForm() {
  const router = useRouter()
  const [job, setJob] = useState({
    title: '',
    companyName: '',
    companyLogo: '',
    overview: '',
    location: '',
    salary: '',
    experience: 'pursuing',
    otherExperience: '',
    qualification: '',
    lastDate: '',
    category: 'technical',
    subCategory: '',
    otherSubCategory: '',
    jobType: 'intern',
    applyLink: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }

    // Prepare the job data
    const jobData = {
      ...job,
      experience: job.experience === 'other' ? job.otherExperience : job.experience,
      subCategory: job.subCategory === 'Other' ? job.otherSubCategory : job.subCategory,
      datePosted: new Date(),
      expirationDate: new Date(job.lastDate)
    }

    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData),
    })

    if (response.ok) {
      alert('Job added successfully!')
      setJob({
        title: '',
        companyName: '',
        companyLogo: '',
        overview: '',
        location: '',
        salary: '',
        experience: 'pursuing',
        otherExperience: '',
        qualification: '',
        lastDate: '',
        category: 'technical',
        subCategory: '',
        otherSubCategory: '',
        jobType: 'intern',
        applyLink: '',
      })
    } else {
      alert('Error adding job')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              {/* Basic Information */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={job.title}
                  onChange={(e) => setJob({ ...job, title: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={job.companyName}
                  onChange={(e) => setJob({ ...job, companyName: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Category Selection */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={job.category}
                  onChange={(e) => setJob({ ...job, category: e.target.value, subCategory: '' })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="technical">Technical</option>
                  <option value="non-technical">Non-Technical</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                  Field
                </label>
                <select
                  id="subCategory"
                  name="subCategory"
                  value={job.subCategory}
                  onChange={(e) => setJob({ ...job, subCategory: e.target.value })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select Field</option>
                  {(job.category === 'technical' ? TECHNICAL_FIELDS : NON_TECHNICAL_FIELDS).map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

              {job.subCategory === 'Other' && (
                <div className="col-span-6">
                  <label htmlFor="otherSubCategory" className="block text-sm font-medium text-gray-700">
                    Specify Field
                  </label>
                  <input
                    type="text"
                    id="otherSubCategory"
                    name="otherSubCategory"
                    value={job.otherSubCategory}
                    onChange={(e) => setJob({ ...job, otherSubCategory: e.target.value })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              )}

              {/* Experience */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={job.experience}
                  onChange={(e) => setJob({ ...job, experience: e.target.value })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="pursuing">Pursuing</option>
                  <option value="fresher">Fresher</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {job.experience === 'other' && (
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="otherExperience" className="block text-sm font-medium text-gray-700">
                    Specify Experience
                  </label>
                  <input
                    type="text"
                    id="otherExperience"
                    name="otherExperience"
                    value={job.otherExperience}
                    onChange={(e) => setJob({ ...job, otherExperience: e.target.value })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              )}

              {/* Rest of the form fields */}
              <div className="col-span-6">
                <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700">
                  Company Logo URL
                </label>
                <input
                  type="url"
                  name="companyLogo"
                  id="companyLogo"
                  value={job.companyLogo}
                  onChange={(e) => setJob({ ...job, companyLogo: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="overview" className="block text-sm font-medium text-gray-700">
                  Job Overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  rows={3}
                  value={job.overview}
                  onChange={(e) => setJob({ ...job, overview: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={job.location}
                  onChange={(e) => setJob({ ...job, location: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  name="salary"
                  id="salary"
                  value={job.salary}
                  onChange={(e) => setJob({ ...job, salary: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter minimum salary"
                  required
                />
                <div className="mt-4 flex items-center">
                  <label className="text-sm text-gray-600 pr-2">Salary Range:</label>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={job.salary || 0}
                    onChange={(e) => setJob({ ...job, salary: e.target.value })}
                    className="w-full"
                  />
                  <span className="ml-2 text-gray-800">{job.salary || 0}</span>
                </div>
              </div>


              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={job.jobType}
                  onChange={(e) => setJob({ ...job, jobType: e.target.value })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="intern">Intern</option>
                  <option value="fulltime">Full Time</option>
                  <option value="intern+full">Intern + Full Time</option>
                  <option value="parttime">Part Time</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700">
                  Last Date to Apply
                </label>
                <input
                  type="date"
                  name="lastDate"
                  id="lastDate"
                  value={job.lastDate}
                  onChange={(e) => setJob({ ...job, lastDate: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  id="qualification"
                  value={job.qualification}
                  onChange={(e) => setJob({ ...job, qualification: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700">
                  Apply Link
                </label>
                <input
                  type="url"
                  name="applyLink"
                  id="applyLink"
                  value={job.applyLink}
                  onChange={(e) => setJob({ ...job, applyLink: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Job
        </button>
      </div>
    </form>
  )
}

