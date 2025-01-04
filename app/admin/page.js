'use client'

import { Suspense } from 'react'
import AdminLogin from '../components/AdminLogin'
import Loading from '../components/Loading'
import { usePageViews } from '../hooks/usePageViews'
import Footer from '../components/Footer'
import Header from '../components/Header'




      

export default function Admin() {
  usePageViews();

  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <AdminLogin />
      </Suspense>
      <Footer/>
    </div>
  )
}

