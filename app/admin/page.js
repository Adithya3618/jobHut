'use client'

import { Suspense } from 'react'
import AdminLogin from '../components/AdminLogin'
import Loading from '../components/Loading'
import { usePageViews } from '../hooks/usePageViews'

export default function Admin() {
  usePageViews();

  return (
    <div>
      <h1>Admin Login</h1>
      <Suspense fallback={<Loading />}>
        <AdminLogin />
      </Suspense>
    </div>
  )
}

