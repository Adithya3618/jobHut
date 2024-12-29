import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-4">
            Welcome to JobHut. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of Services</h2>
          <p className="text-gray-700 mb-4">
            You may use our services only as permitted by law and as described in these Terms. You agree not to misuse our services or help anyone else do so.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Accounts</h2>
          <p className="text-gray-700 mb-4">
            You are responsible for safeguarding the password that you use to access our services. You agree not to disclose your password to any third party and to immediately notify us of any unauthorized use of your account.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content</h2>
          <p className="text-gray-700">
            You retain ownership of any intellectual property rights that you hold in the content you submit to JobHut. By submitting content, you grant JobHut a worldwide, royalty-free license to use, reproduce, modify, and distribute that content in connection with our services.
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

