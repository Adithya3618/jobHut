'use client'

import { Suspense, use } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import JobDetailsContent from '../../components/JobDetailsContent';
import Loading from '../../components/Loading';
import PageViewWrapper from '../../components/PageViewWrapper'

export default function JobDetails({ params }) {

  const { id } = use(params);

  return (
    <PageViewWrapper>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Suspense fallback={<Loading />}>
        <JobDetailsContent id={id} />
      </Suspense>
      <Footer />
    </div>
    </PageViewWrapper>
  );
}

