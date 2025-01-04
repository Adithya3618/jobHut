'use client'

import { Suspense } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CouponsList from '../components/CouponsList'
import Loading from '../components/Loading'
import { usePageViews } from '../hooks/usePageViews'

export default function CouponsPage() {
  usePageViews();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Coupons</h1>
        <Suspense fallback={<Loading />}>
          <CouponsList />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

