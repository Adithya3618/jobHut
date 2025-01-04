
// terms.js
import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageViewWrapper from '../components/PageViewWrapper'

export default function TermsOfServicePage() {

  return (
    <PageViewWrapper>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 mb-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Platform Usage</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  By using JobHut's job aggregation services, you agree to these terms and conditions. Our platform is designed to help you discover job opportunities from various sources efficiently and effectively.
                </p>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Acceptable Use</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Search and apply for legitimate job opportunities</li>
                    <li>• Create and maintain accurate user profiles</li>
                    <li>• Interact professionally with employers</li>
                    <li>• Respect intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Accounts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Account Requirements</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Accurate personal information</li>
                    <li>• Strong password protection</li>
                    <li>• Regular information updates</li>
                    <li>• One account per user</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Prohibited Activities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Sharing account credentials</li>
                    <li>• Posting false information</li>
                    <li>• Scraping or data mining</li>
                    <li>• Malicious behavior</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Modifications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                JobHut reserves the right to modify, suspend, or discontinue any part of our service at any time. We will provide notice of significant changes when possible.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Our Commitment</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div className="font-semibold text-gray-800">Service Quality</div>
                    <p className="text-gray-700 text-sm">Maintaining high service standards</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="font-semibold text-gray-800">User Support</div>
                    <p className="text-gray-700 text-sm">Responsive customer assistance</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="font-semibold text-gray-800">Platform Security</div>
                    <p className="text-gray-700 text-sm">Regular security updates</p>
                  </div>
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
    </PageViewWrapper>
  );
}