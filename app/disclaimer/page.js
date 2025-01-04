// disclaimer.js
import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { usePageViews } from '../hooks/usePageViews'

export default function DisclaimerPage() {
  usePageViews();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Disclaimer</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 mb-8">
            {/* Job Information Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Information Accuracy</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    JobHut operates as a job aggregation platform, collecting and displaying job listings from various sources across the internet. While we strive to provide accurate and up-to-date information, please note:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      Job listings are collected automatically and may not reflect real-time availability
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      Positions may be filled or modified by employers without immediate updates to our platform
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      Salary information and job requirements may vary from what is actually offered by employers
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Responsibility Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibility</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Before Applying</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Verify job details directly with employers
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Research the hiring company thoroughly
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Check current availability of positions
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Confirm application requirements
                    </li>
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Safety Precautions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Never send money to potential employers
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Protect your personal information
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Be cautious of work-from-home scams
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Report suspicious job listings
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Content */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Content</h2>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  JobHut aggregates content from numerous third-party sources and cannot guarantee:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-2">Accuracy</h3>
                    <p className="text-gray-700 text-sm">
                      Content accuracy or completeness from external sources
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
                    <p className="text-gray-700 text-sm">
                      Continuous availability of linked content
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-2">Quality</h3>
                    <p className="text-gray-700 text-sm">
                      Quality or legitimacy of third-party services
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <div className="border border-gray-200 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  JobHut is not liable for any damages or losses resulting from:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Use or inability to use our services
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Actions taken based on aggregated job information
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Interactions with employers or other users through our platform
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Technical issues or interruptions in service
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}