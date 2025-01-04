'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function EditCouponForm({ coupon, onSubmit, onCancel }) {
  const [editedCoupon, setEditedCoupon] = useState(coupon)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(editedCoupon)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedCoupon(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Coupon Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedCoupon.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="couponId" className="block text-sm font-medium text-gray-700">
          Coupon ID
        </label>
        <input
          type="text"
          id="couponId"
          name="couponId"
          value={editedCoupon.couponId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="linkToApply" className="block text-sm font-medium text-gray-700">
          Link to Apply
        </label>
        <input
          type="url"
          id="linkToApply"
          name="linkToApply"
          value={editedCoupon.linkToApply}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={editedCoupon.description}
          onChange={handleChange}
          required
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

