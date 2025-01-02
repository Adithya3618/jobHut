import { use } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ApplyCouponButton from '../../components/ApplyCouponButton'

async function getCoupon(id) {
  // Use absolute URL with origin for server-side fetching
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'
    
  const response = await fetch(`${baseUrl}/api/coupons/${id}`, {
    cache: 'no-store'
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch coupon')
  }
  return response.json()
}

export default function CouponDetails({ params }) {
  const id = use(params).id
  const coupon = use(getCoupon(id))

  if (!coupon) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center text-red-500">Coupon not found</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{coupon.name}</h1>
          <p className="text-gray-600 mb-4">Coupon ID: {coupon.couponId}</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-800 whitespace-pre-line">{coupon.description}</p>
          </div>
          <ApplyCouponButton coupon={coupon} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

