'use client'

import { useState, useEffect } from 'react'
import CouponCard from './CouponCard'
import Loading from './Loading'

export default function CouponsList() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons')
      if (!response.ok) {
        throw new Error('Failed to fetch coupons')
      }
      const data = await response.json()
      setCoupons(data)
    } catch (error) {
      console.error('Error fetching coupons:', error)
      setError('Failed to load coupons. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.couponId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading />
  
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or coupon ID"
          className="w-full px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredCoupons.length === 0 ? (
        <div className="text-center text-gray-500">No coupons found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
      )}
    </div>
  )
}

