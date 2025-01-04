'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Loading from './Loading'
import EditCouponForm from './EditCouponForm'
import { toast } from 'react-hot-toast'

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCoupon, setEditingCoupon] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingCouponId, setDeletingCouponId] = useState(null)
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
    } finally {
      setShowDeleteDialog(false)
      setDeletingCouponId(null)
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Coupon Management</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your discount coupons and promotional offers
              </p>
            </div>
            
          </div>
        </div>
        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search coupons by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCoupons.map(coupon => (
              <div key={coupon._id} className="bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{coupon.name}</h3>
                      <p className="text-sm text-gray-500">ID: {coupon.couponId}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingCouponId(coupon._id)
                          setShowDeleteDialog(true)
                        }}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{coupon.description}</p>
                  <div className="text-xs text-gray-400">
                    Created: {new Date(coupon.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. This will permanently delete the coupon.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false)
                  setDeletingCouponId(null)
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingCouponId)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}