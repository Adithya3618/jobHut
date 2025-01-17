'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Calendar, User, Tag } from 'lucide-react'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [searchTerm])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blogs?status=approved&search=${searchTerm}`)
      if (!response.ok) {
        throw new Error('Failed to fetch blogs')
      }
      const data = await response.json()
      setBlogs(data.blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setError('Failed to load blogs. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg">
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <button
            onClick={fetchBlogs}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog._id}`} key={blog._id}>
            <div className="group h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {blog.content}
                </p>
                
                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}