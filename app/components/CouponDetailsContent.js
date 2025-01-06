'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
import PageViewWrapper from '../components/PageViewWrapper';
export default function CouponDetailsContent({ id }) {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCoupon() {
      try {
        const response = await fetch(`/api/coupons/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coupon');
        }
        const data = await response.json();
        setCoupon(data);
      } catch (error) {
        console.error('Error fetching coupon:', error);
        setError('Failed to load coupon. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCoupon();
    }
  }, [id]);

  const handleApply = () => {
    setRedirecting(true);
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      window.location.href = coupon.linkToApply;
    }, 5000);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!coupon) return <div className="text-center">Coupon not found</div>;

  return (
    <PageViewWrapper>
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{coupon.name}</h1>
        <p className="text-gray-600 mb-4">Coupon ID: {coupon.couponId}</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-800 whitespace-pre-line">{coupon.description}</p>
        </div>
        {redirecting ? (
          <div className="text-center">
            <p className="text-xl mb-2">Redirecting in {countdown} seconds...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleApply}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Apply Coupon
          </button>
        )}
      </div>
    </main>
    </PageViewWrapper>
  );
}

