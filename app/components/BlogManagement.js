'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from './Loading'
import { toast } from 'react-hot-toast'

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalBlogs, setTotalBlogs] = useState(0)
  const blogsPerPage = 20
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [currentPage, searchTerm])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: blogsPerPage.toString(),
        search: searchTerm,
        status: 'all'
      })
      const response = await fetch(`/api/blogs?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch blogs')
      const data = await response.json()
      setBlogs(data.blogs)
      setTotalBlogs(data.total)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (blogId, newStatus) => {
    try {
      const response = await fetch(`/api/blogs`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ id: blogId, status: newStatus })
      })
      if (!response.ok) throw new Error('Failed to update blog status')
      toast.success(`Blog ${newStatus === 'approved' ? 'approved' : 'rejected'}`)
      fetchBlogs()
    } catch (error) {
      console.error('Error updating blog status:', error)
      toast.error('Error updating blog status')
    }
  }

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ id: blogId })
      })
      if (!response.ok) throw new Error('Failed to delete blog')
      toast.success('Blog deleted successfully')
      fetchBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Error deleting blog')
    }
  }

  if (loading) return <Loading />

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {blogs.length === 0 ? (
        <div className="text-center">No blogs available.</div>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-2">By {blog.author}</p>
            <p className="text-gray-600 mb-2">Category: {blog.category}</p>
            <p className="text-gray-600 mb-2">Status: {blog.status}</p>
            <div className="mt-4 flex justify-end space-x-2">
              {blog.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange(blog._id, 'approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(blog._id, 'rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {Math.min((currentPage - 1) * blogsPerPage + 1, totalBlogs)} - {Math.min(currentPage * blogsPerPage, totalBlogs)} of {totalBlogs} blogs
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage * blogsPerPage >= totalBlogs}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

