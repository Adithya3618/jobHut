'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from './Loading'
import EditCouponForm from './EditCouponForm'
import { toast } from 'react-hot-toast'

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCoupon, setEditingCoupon] = useState(null)
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
      toast.error('Failed to load coupons')
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
      toast.success('Coupon deleted successfully')
    } catch (error) {
      console.error('Error deleting coupon:', error)
      toast.error('Error deleting coupon')
    }
  }

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon)
  }

  const handleEditSubmit = async (updatedCoupon) => {
    try {
      const response = await fetch(`/api/coupons/${updatedCoupon._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updatedCoupon)
      })
      if (!response.ok) throw new Error('Failed to update coupon')
      setCoupons(coupons.map(coupon => coupon._id === updatedCoupon._id ? updatedCoupon : coupon))
      setEditingCoupon(null)
      toast.success('Coupon updated successfully')
    } catch (error) {
      console.error('Error updating coupon:', error)
      toast.error('Error updating coupon')
    }
  }

  const filteredCoupons = coupons.filter(coupon =>
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.couponId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading />

  if (editingCoupon) {
    return <EditCouponForm coupon={editingCoupon} onSubmit={handleEditSubmit} onCancel={() => setEditingCoupon(null)} />
  }

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
                onClick={() => handleEdit(coupon)}
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

