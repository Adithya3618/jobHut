'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from './Loading'

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch coupons')
      const data = await response.json()
      setCoupons(data)
    } catch (error) {
      console.error('Error fetching coupons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (couponId) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return

    try {
      const response = await fetch(`/api/coupons/${couponId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      if (!response.ok) throw new Error('Failed to delete coupon')
      setCoupons(coupons.filter(coupon => coupon._id !== couponId))
    } catch (error) {
      console.error('Error deleting coupon:', error)
      alert('Error deleting coupon')
    }
  }

  const filteredCoupons = coupons.filter(coupon =>
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.couponId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading />

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search coupons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid gap-4">
        {filteredCoupons.map(coupon => (
          <div key={coupon._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{coupon.name}</h3>
            <p className="text-sm text-gray-600">Coupon ID: {coupon.couponId}</p>
            <p className="mt-2">{coupon.description}</p>
            <p className="text-sm text-gray-500 mt-2">Created: {new Date(coupon.createdAt).toLocaleString()}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => router.push(`/admin/edit-coupon/${coupon._id}`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(coupon._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

