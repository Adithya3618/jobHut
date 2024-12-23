import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import RecentJobs from './components/RecentJobs'
import SearchForm from './components/SearchForm'
import JobCategories from './components/JobCategories'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 pt-10">Find Your Dream Job</h1>
          <p className="text-xl mb-8">Explore thousands of job opportunities with all the information you need.</p>
          <SearchForm />
        </section>
        <section className="mb-12 pt-10">
          <JobCategories />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Job Listings</h2>
          <RecentJobs />
          <div className="text-center mt-8">
            <Link href="/jobs" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              View All Jobs
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

