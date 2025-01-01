'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import { Clock, Tag, AlertCircle } from 'lucide-react';

export default function CouponDetails() {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      fetchCoupon(params.id);
    }
  }, [params]);

  const fetchCoupon = async (id) => {
    try {
      const response = await fetch(`/api/coupons/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch coupon');
      }
      const data = await response.json();
      setCoupon(data);
    } catch (error) {
      console.error('Error fetching coupon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    setRedirecting(true);
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      if (coupon?.linkToApply) {
        router.push(coupon.linkToApply);
      }
    }, 5000);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Coupon Not Found</h1>
            <p className="text-gray-600 mb-4">The coupon you're looking for doesn't exist or has expired.</p>
            <button
              onClick={() => router.push('/coupons')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Coupons
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{coupon.name}</h1>
              <div className="flex items-center text-blue-100">
                <Tag className="h-4 w-4 mr-2" />
                <p>Coupon ID: {coupon.couponId}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-gray-800">{coupon.description}</p>
              </div>

              {redirecting ? (
                <div className="text-center p-4">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-500 mr-2 animate-pulse" />
                    <p className="text-xl text-gray-700">
                      Redirecting in <span className="font-bold text-blue-500">{countdown}</span> seconds...
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={handleApply}
                    className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Apply Coupon
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}