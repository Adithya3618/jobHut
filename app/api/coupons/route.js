import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'
import { verifyToken } from '../../lib/auth'

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db('jobhut')
    const coupons = await db.collection('coupons').find({}).toArray()
    
    const serializedCoupons = coupons.map(coupon => ({
      ...coupon,
      _id: coupon._id.toString()
    }))
    
    return NextResponse.json(serializedCoupons)
  } catch (error) {
    console.error('Error in GET /api/coupons:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decodedToken = verifyToken(token)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const coupon = await request.json()
    const client = await clientPromise
    const db = client.db('jobhut')
    const result = await db.collection('coupons').insertOne(coupon)
    return NextResponse.json({ success: true, _id: result.insertedId.toString() })
  } catch (error) {
    console.error('Error in POST /api/coupons:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

