import { Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import JobDetailsContent from '../../components/JobDetailsContent';
import Loading from '../../components/Loading';

export default async function JobDetails({ params }) {
  const id = params?.id ? await Promise.resolve(params.id) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Suspense fallback={<Loading />}>
        <JobDetailsContent id={id} />
      </Suspense>
      <Footer />
    </div>
  );
}

