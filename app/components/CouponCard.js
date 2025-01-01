import Link from 'next/link'
import { Tag, ArrowRight } from 'lucide-react'

export default function CouponCard({ coupon }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4 text-blue-500" />
          <p className="text-sm text-blue-600 font-medium">
            {coupon.couponId}
          </p>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {coupon.name}
        </h2>
        
        <p className="text-gray-600 mb-6 line-clamp-3">
          {coupon.description}
        </p>
        
        <Link
          href={`/coupons/${coupon._id}`}
          className="group inline-flex items-center justify-center bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  )
}