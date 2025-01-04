'use client'

import { Suspense } from 'react'
import AdminLogin from '../components/AdminLogin'
import Loading from '../components/Loading'
import PageViewWrapper from '../components/PageViewWrapper'

export default function Admin() {
 

  return (
    <PageViewWrapper>
    <div>
      <h1>Admin Login</h1>
      <Suspense fallback={<Loading />}>
        <AdminLogin />
      </Suspense>
    </div>
    </PageViewWrapper>
  )
}

