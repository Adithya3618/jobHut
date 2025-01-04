'use client'

import { Suspense, use } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import JobDetailsContent from '../../components/JobDetailsContent';
import Loading from '../../components/Loading';
import { usePageViews } from '../../hooks/usePageViews';

export default function JobDetails({ params }) {
  usePageViews();
  const { id } = use(params);

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

