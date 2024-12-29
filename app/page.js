import { Suspense } from 'react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import RecentJobs from './components/RecentJobs'
import SearchForm from './components/SearchForm'
import JobCategories from './components/JobCategories'
import Loading from './components/loading'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Find Your Dream Job</h1>
          <p className="text-xl mb-8 text-gray-600">Explore thousands of job opportunities with all the information you need.</p>
          <SearchForm />
        </section>
        <Suspense fallback={<Loading />}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Popular Job Categories</h2>
            <JobCategories />
          </section>
        </Suspense>
        <Suspense fallback={<Loading />}>
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recent Job Listings</h2>
            <RecentJobs />
            <div className="text-center mt-8">
              <Link href="/jobs" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                View All Jobs
              </Link>
            </div>
          </section>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}