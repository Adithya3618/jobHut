import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
        <p className="mb-4">
          The information provided on JobHut is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
        </p>
        <p className="mb-4">
          JobHut does not guarantee the accuracy of job listings or the validity of employers. We encourage job seekers to conduct their own research on potential employers and exercise caution when applying for jobs or providing personal information.
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home Page
        </Link>
      </main>
      <Footer />
    </div>
  )
}

