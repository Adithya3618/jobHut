import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">About JobHut</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-700 mb-4">
              JobHut is a leading online job portal dedicated to connecting talented professionals with exciting career opportunities. Founded with the mission to simplify the job search process, we've quickly become a trusted platform for both job seekers and employers.
            </p>
            <p className="text-gray-700 mb-4">
              Our team is passionate about leveraging technology to create meaningful connections in the job market. We understand the challenges of finding the right job or the perfect candidate, and we're here to make that process smoother and more efficient.
            </p>
            <p className="text-gray-700">
              At JobHut, we believe that the right job can transform lives and drive business success. That's why we're committed to continuous innovation and exceptional service, ensuring that we remain at the forefront of the evolving job market.
            </p>
          </div>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}