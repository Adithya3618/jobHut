import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-4">
            At JobHut, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our website and services.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect personal information that you provide directly to us, such as your name, email address, phone number, and resume details when you create an account or apply for jobs through our platform.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use your information to provide and improve our services, communicate with you about job opportunities, and ensure the security of our platform. We do not sell your personal information to third parties.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
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

