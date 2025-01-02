import Link from 'next/link';
import { Tag, Clock, Percent, Ticket } from 'lucide-react';

export default function CouponCard({ coupon }) {
  const validUntil = coupon.validUntil ? new Date(coupon.validUntil).toLocaleDateString() : null;
  const discount = coupon.discountPercentage ? `${coupon.discountPercentage}% OFF` : 'Special Offer';
  
  return (
    <div className="group relative h-full bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-45">
        <Ticket className="w-full h-full text-blue-500" />
      </div>

      {/* Discount Badge */}
      <div className="absolute -top-2 -right-2">
        <div className="relative">
          <div className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg transform transition-transform group-hover:scale-105">
            {discount}
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="p-6 space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {coupon.name}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 rounded-md">
                <Tag className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-700 font-medium">
                  {coupon.couponId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 space-y-4">
        {/* Description with better typography */}
        <p className="text-gray-600 text-base leading-relaxed line-clamp-2">
          {coupon.description}
        </p>

        {/* Additional Details with enhanced visual separation */}
        <div className="flex flex-wrap gap-4 text-sm pt-2">
          {validUntil && (
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>Valid until {validUntil}</span>
            </div>
          )}
          {coupon.category && (
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <Tag className="w-4 h-4 text-gray-500" />
              <span>{coupon.category}</span>
            </div>
          )}
        </div>

        {/* Terms Preview with improved visibility */}
        {coupon.terms && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md line-clamp-1">
            <span className="font-medium">Terms:</span> {coupon.terms}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="p-6 mt-4">
        <Link
          href={`/coupons/${coupon._id}`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}