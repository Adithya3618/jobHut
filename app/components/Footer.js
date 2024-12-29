import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">JobHut</h3>
            <p className="text-sm">Find your dream job with ease.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Job Categories</h3>
            <ul className="text-sm">
              <li><Link href="/jobs?category=technical">Technical Jobs</Link></li>
              <li><Link href="/jobs?category=non-technical">Non-Technical Jobs</Link></li>
              <li><Link href="/jobs?category=internship">Internships</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="text-sm">
              <li><Link href="/disclaimer">Disclaimer</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
              <li><Link href="/admin">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 JobHut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

