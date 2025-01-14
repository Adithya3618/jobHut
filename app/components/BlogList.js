'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Loading from './Loading'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blogs?status=approved')
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

  if (loading) return <Loading />
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-8">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-800 mb-4 line-clamp-3">{blog.content}</p>
            <Link href={`/blogs/${blog._id}`} className="text-blue-600 hover:underline">
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

