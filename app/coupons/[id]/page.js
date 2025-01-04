'use client'

import { Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CouponDetailsContent from '../../components/CouponDetailsContent';
import Loading from '../../components/Loading';
import { usePageViews } from '../../hooks/usePageViews';

export default function CouponDetails({ params }) {
  usePageViews();
  const id = params?.id || null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<Loading />}>
        <CouponDetailsContent id={id} />
      </Suspense>
      <Footer />
    </div>
  );
}

