import ResumeAnalysisForm from '../components/ResumeAnalysisForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageViewWrapper from '../components/PageViewWrapper';

export const metadata = {
  title: 'Resume Analysis | JobHut',
  description: 'Analyze your resume against job descriptions to improve your chances of landing your dream job.',
};

export default function ResumeAnalysisPage() {
  return (
    <PageViewWrapper>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Resume Analysis</h1>
          <ResumeAnalysisForm />
        </main>
        <Footer />
      </div>
    </PageViewWrapper>
  );
}

