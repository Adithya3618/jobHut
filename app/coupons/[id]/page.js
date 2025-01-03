import { Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CouponDetailsContent from '../../components/CouponDetailsContent';
import Loading from '../../components/Loading';

export default async function CouponDetails({ params }) {
  const id = params?.id ? await Promise.resolve(params.id) : null;

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

