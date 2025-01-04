'use client'

import { Suspense } from 'react'
import AdminLogin from '../components/AdminLogin'
import Loading from '../components/Loading'
import { usePageViews } from '../hooks/usePageViews'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const dynamic = 'force-dynamic'

export default function Admin() {
  usePageViews()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <div className="container mx-auto px-4 py-8">
            <AdminLogin />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
