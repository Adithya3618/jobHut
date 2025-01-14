import { Suspense } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BlogList from '../components/BlogList'
import BlogSubmissionForm from '../components/BlogSubmissionForm'
import Loading from '../components/Loading'
import PageViewWrapper from '../components/PageViewWrapper'
import AdSense from '../components/AdSense'

export const metadata = {
  title: 'Blogs | JobHut',
  description: 'Read and submit the latest blogs, articles, and interview experiences from JobHut community.',
};

export default function BlogsPage() {
  return (
    <PageViewWrapper>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">JobHut Blogs</h1>

          

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
            <BlogSubmissionForm />
          </div>

          <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
          <Suspense fallback={<Loading />}>
            <BlogList />
          </Suspense>

          
        </main>
        <Footer />
      </div>
    </PageViewWrapper>
  )
}

