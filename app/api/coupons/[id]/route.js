import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    // Ensure params is awaited correctly
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: 'Invalid coupon ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('jobhut');
    const coupon = await db.collection('coupons').findOne({ _id: new ObjectId(id) });

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    const serializedCoupon = {
      ...coupon,
      _id: coupon._id.toString(),
    };

    return NextResponse.json(serializedCoupon);
  } catch (error) {
    console.error('Error in GET /api/coupons/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
