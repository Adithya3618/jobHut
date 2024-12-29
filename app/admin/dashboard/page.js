'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AddJobForm from '../../components/AddJobForm'
import JobManagement from '../../components/JobManagement'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('jobs') // 'jobs' or 'add'
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
    } else {
      setIsLoggedIn(true)
    }
  }, [])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div>
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`${
                activeTab === 'jobs'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Jobs
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`${
                activeTab === 'add'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Add New Job
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'jobs' ? <JobManagement /> : <AddJobForm />}
    </div>
    <Footer/>
    </div>
    
  )
}

