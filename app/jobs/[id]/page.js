import { Suspense } from 'react';
import { getJobById, getSimilarJobs, getRecentJobs } from '../../lib/jobs';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import JobCard from '../../components/JobCard'
import ApplyButton from '../../components/ApplyButton';
import Loading from '../../components/Loading';
import { Calendar, MapPin, Building2, Cpu, BadgeDollarSign, Clock, Users, User2, GraduationCap } from 'lucide-react';

export default async function JobDetails({ params }) {
  // Await params before destructuring
  const id = await params.id;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Suspense fallback={<Loading />}>
        <JobDetailsContent id={id} />
      </Suspense>
      <Footer />
    </div>
  );
}

// Update JobDetailsContent to receive id directly
async function JobDetailsContent({ id }) {
  const job = await getJobById(id);
  const similarJobs = job ? await getSimilarJobs(job.subCategory, 6) : [];
  const recentJobs = await getRecentJobs(9);

  if (!job) {
    return <div className="container mx-auto px-4 py-8">Job not found</div>
  }

  const datePosted = job.datePosted ? new Date(job.datePosted).toLocaleDateString() : 'N/A'
  const lastDate = job.lastDate ? new Date(job.lastDate).toLocaleDateString() : 'N/A'

  const getJobTypeBadge = (type) => {
    const badges = {
      intern: 'bg-purple-100 text-purple-800',
      fulltime: 'bg-blue-100 text-blue-800',
      'intern+full': 'bg-green-100 text-green-800',
      parttime: 'bg-orange-100 text-orange-800',
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to get job type badge color
  const getJobTypeBadgeColor = (type) => {
    const colors = {
      intern: 'bg-purple-100 text-purple-800',
      fulltime: 'bg-green-100 text-green-800',
      'intern+full': 'bg-blue-100 text-blue-800',
      parttime: 'bg-orange-100 text-orange-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {/* Job Header Section */}
      <div className="bg-white shadow-sm rounded-lg mb-6">
        <div className="relative">
          {/* Background Banner */}
          <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg" />

          {/* Company Logo & Basic Info */}
          <div className="px-8 pb-6 relative">
            <div className="absolute -top-12">
              <div className="w-24 h-24 bg-white rounded-lg shadow-md p-2">
                <Image
                  src={job.companyLogo || '/placeholder.svg'}
                  alt={`${job.companyName} logo`}
                  width={96}
                  height={96}
                  className="rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="pt-16">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeBadgeColor(job.jobType)}`}>
                  {job.jobType === 'intern+full' ? 'Intern + Full Time' :
                    job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM3 10a7 7 0 1114 0v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                  </svg>
                  {job.companyName}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {job.location}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Posted: {datePosted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Job Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Position Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg text-blue-600 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium capitalize">{job.category}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg text-blue-600 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Field</p>
                  <p className="font-medium">{job.subCategory === 'Other' ? job.otherSubCategory : job.subCategory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="whitespace-pre-line">{job.overview}</p>
            </div>
            {/* Apply Button Centered */}
            <div className="text-center mt-8">
              <ApplyButton
                applyLink={job.applyLink}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg shadow-xl transform hover:scale-105 transition duration-200 text-lg font-semibold"
              />
              <p className="mt-4 text-gray-500 text-sm italic">Click above to start your journey with us!</p>
            </div>
            {/* Disclaimer Section */}
            <div className="mt-10 border-t pt-6 text-center">
              <p className="text-sm text-gray-600">
                <strong>Disclaimer:</strong> This is a job listing website. While we strive to ensure accuracy, we encourage you to
                cross-check the job details with the company directly before applying. Apply responsibly!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Job Information */}
        {/* Additional Job Info */}
        <div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-6">Job Details</h3>
            <ul className="space-y-4">
              {[{ label: 'Date Posted', value: datePosted, icon: <Calendar size={20} /> },
              { label: 'Location', value: job.location, icon: <MapPin size={20} /> },
              { label: 'Salary', value: job.salary, icon: <BadgeDollarSign size={20} /> },
              { label: 'Expiration Date', value: lastDate, icon: <Clock size={20} /> },
              { label: 'Experience', value: job.experience, icon: <Users size={20} /> },
              { label: 'Field', value: job.category, icon: <User2 size={20} /> },
              { label: 'Qualification', value: job.qualification, icon: <GraduationCap size={20} /> },].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <p className="font-medium text-gray-800">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Jobs Section */}
      <section className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Similar Jobs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarJobs.map((similarJob) => (
            <JobCard key={similarJob._id} job={similarJob} />
          ))}
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="mt-16 bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">Recently Added Jobs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentJobs.map((recentJob) => (
            <JobCard key={recentJob._id} job={recentJob} />
          ))}
        </div>
      </section>
    </main>
  )
}

