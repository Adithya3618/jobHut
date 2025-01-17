import { Suspense } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ResumeAnalysisForm from '../components/ResumeAnalysisForm'
import Loading from '../components/Loading'
import PageViewWrapper from '../components/PageViewWrapper'

export const metadata = {
  title: 'Resume Analysis | JobHut',
  description: 'Analyze your resume and get personalized feedback to improve your job applications.',
};

export default function ResumeAnalysisPage() {
  return (
    <PageViewWrapper>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Resume Analysis</h1>
          <Suspense fallback={<Loading />}>
            <ResumeAnalysisForm />
          </Suspense>
        </main>
        <Footer />
      </div>
    </PageViewWrapper>
  )
}

