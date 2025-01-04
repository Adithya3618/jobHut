// privacy-policy.js
import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { usePageViews } from '../hooks/usePageViews'

export default function PrivacyPolicyPage() {
  usePageViews();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 mb-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Collection and Use</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  As a job aggregation platform, JobHut collects and processes certain personal information to provide you with the best job search experience. We take your privacy seriously and handle your data with utmost care.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Information We Collect:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Account details (name, email, password)</li>
                    <li>• Professional information (resume, work history)</li>
                    <li>• Job search preferences and interests</li>
                    <li>• Usage data and search patterns</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Data</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Essential Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Matching you with relevant job opportunities</li>
                    <li>• Processing job applications</li>
                    <li>• Account management</li>
                    <li>• Customer support</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Service Improvement</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Analyzing user behavior</li>
                    <li>• Improving search algorithms</li>
                    <li>• Enhancing user experience</li>
                    <li>• Market research</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure. Our security practices include:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Encryption</h3>
                  <p className="text-gray-700">All sensitive data is encrypted in transit and at rest</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Access Control</h3>
                  <p className="text-gray-700">Strict access controls and authentication measures</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Regular Audits</h3>
                  <p className="text-gray-700">Continuous security monitoring and auditing</p>
                </div>
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