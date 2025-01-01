'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'

export default function CouponDetails({ params }) {
  const [coupon, setCoupon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState(5)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchCoupon()
  }, [])

  const fetchCoupon = async () => {
    try {
      const response = await fetch(`/api/coupons/${params.id}`)
      const data = await response.json()
      setCoupon(data)
    } catch (error) {
      console.error('Error fetching coupon:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    setRedirecting(true)
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
      router.push(coupon.linkToApply)
    }, 5000)
  }

  if (loading) return <Loading />

  if (!coupon) return <div>Coupon not found</div>

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{coupon.name}</h1>
          <p className="text-gray-600 mb-4">Coupon ID: {coupon.couponId}</p>
          <p className="text-gray-800 mb-6">{coupon.description}</p>
          {redirecting ? (
            <div className="text-center">
              <p className="text-xl mb-2">Redirecting in {countdown} seconds...</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Apply Coupon
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

