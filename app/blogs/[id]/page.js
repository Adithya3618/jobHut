'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'
import PageViewWrapper from '../../components/PageViewWrapper'
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Bookmark, ThumbsUp, MessageCircle, Link as LinkIcon } from 'lucide-react'

export default function BlogDetailPage({ params }) {
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch blog')
        }
        const data = await response.json()
        setBlog(data)
        setLikes(data.likes || 0)
      } catch (error) {
        console.error('Error fetching blog:', error)
        setError('Failed to load blog. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id])

  if (loading) {
    return (
      <PageViewWrapper>
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <Loading />
        </div>
        <Footer />
      </PageViewWrapper>
    )
  }

  if (error) {
    return (
      <PageViewWrapper>
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="bg-red-50 text-red-600 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
        <Footer />
      </PageViewWrapper>
    )
  }

  if (!blog) {
    return (
      <PageViewWrapper>
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="bg-yellow-50 text-yellow-600 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Not Found</h2>
            <p>The requested blog post could not be found.</p>
          </div>
        </div>
        <Footer />
      </PageViewWrapper>
    )
  }

  return (
    <PageViewWrapper>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Navigation */}
            <button
              onClick={() => router.back()}
              className="mb-8 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2" size={20} />
              <span className="font-medium">Back to Blogs</span>
            </button>

            {/* Article Card */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="p-8 border-b border-gray-100">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    <span>{blog.category}</span>
                  </div>
                  
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="prose max-w-none mb-8">
                  {blog.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags Section */}
                {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-600 rounded-full px-4 py-1 text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Links Section */}
                {blog.relatedLinks && Array.isArray(blog.relatedLinks) && blog.relatedLinks.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Links</h2>
                    <ul className="space-y-3">
                      {blog.relatedLinks.map((link, index) => (
                        <li key={index} className="flex items-center">
                          <LinkIcon className="w-4 h-4 text-blue-600 mr-2" />
                          <Link
                            href={link}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </PageViewWrapper>
  )
}