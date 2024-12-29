'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AddJobForm from '../../components/AddJobForm'
import JobManagement from '../../components/JobManagement'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('jobs')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Admin Dashboard
              </h1>
              
              <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`${
                      activeTab === 'jobs'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                  >
                    Manage Jobs
                  </button>
                  <button
                    onClick={() => setActiveTab('add')}
                    className={`${
                      activeTab === 'add'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                  >
                    Add New Job
                  </button>
                </nav>
              </div>

              <div className="bg-white p-6 rounded-lg">
                {activeTab === 'jobs' ? <JobManagement /> : <AddJobForm />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}