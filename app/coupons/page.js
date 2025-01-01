import { Suspense } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CouponsList from '../components/CouponsList'
import Loading from '../components/Loading'

export default function CouponsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
            Available Coupons
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Find and save with our latest discount offers
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-[400px]">
                  <Loading />
                </div>
              }
            >
              <CouponsList />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}