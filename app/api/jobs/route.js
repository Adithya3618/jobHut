import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'
import { verifyToken } from '../../lib/auth'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 20
    const skip = (page - 1) * limit

    const client = await clientPromise
    const db = client.db('jobhut')
    
    const query = {}
    if (searchParams.get('keyword')) {
      query.$or = [
        { title: { $regex: searchParams.get('keyword'), $options: 'i' } },
        { companyName: { $regex: searchParams.get('keyword'), $options: 'i' } },
        { overview: { $regex: searchParams.get('keyword'), $options: 'i' } },
      ]
    }
    if (searchParams.get('location')) query.location = { $regex: searchParams.get('location'), $options: 'i' }
    if (searchParams.get('jobType')) query.jobType = searchParams.get('jobType')
    if (searchParams.get('experience')) query.experience = searchParams.get('experience')
    if (searchParams.get('category')) query.category = searchParams.get('category')
    if (searchParams.get('subCategory')) query.subCategory = searchParams.get('subCategory')
    if (searchParams.get('salary')) {
      // Assuming salary is stored as a number, you might need to adjust this logic
      query.salary = { $gte: parseInt(searchParams.get('salary')) }
    }

    const totalJobs = await db.collection('jobs').countDocuments(query)
    const jobs = await db.collection('jobs')
      .find(query)
      .sort({ datePosted: -1 }) // This ensures the most recent jobs appear first
      .skip(skip)
      .limit(limit)
      .toArray()
    
    const serializedJobs = jobs.map(job => ({
      ...job,
      _id: job._id.toString(),
      datePosted: job.datePosted ? new Date(job.datePosted).toISOString() : null,
      lastDate: job.lastDate ? new Date(job.lastDate).toISOString() : null,
      expirationDate: job.expirationDate ? new Date(job.expirationDate).toISOString() : null
    }))
    
    return NextResponse.json({
      jobs: serializedJobs,
      total: totalJobs,
      page,
      totalPages: Math.ceil(totalJobs / limit)
    })
  } catch (error) {
    console.error('Error in GET /api/jobs:', error)
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

    const jobData = await request.json()
    const client = await clientPromise
    const db = client.db('jobhut')
    
    // Ensure datePosted is set to the current date and time
    jobData.datePosted = new Date()
    
    const result = await db.collection('jobs').insertOne(jobData)
    
    return NextResponse.json({ success: true, _id: result.insertedId.toString() })
  } catch (error) {
    console.error('Error in POST /api/jobs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

