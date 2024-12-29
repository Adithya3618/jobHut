import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-4">
            We're here to help! If you have any questions, concerns, or feedback, please don't hesitate to reach out to us.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Email: support@jobhut.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Job Street, Employment City, WK 12345</li>
          </ul>
          <p className="text-gray-700">
            Our support team is available Monday through Friday, 9:00 AM to 5:00 PM EST.
          </p>
        </div>
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
          ← Back to Home
        </Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

