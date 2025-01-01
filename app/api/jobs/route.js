import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'

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
        { location: { $regex: searchParams.get('keyword'), $options: 'i' } },
      ]
    }
    if (searchParams.get('location')) query.location = { $regex: searchParams.get('location'), $options: 'i' }
    if (searchParams.get('jobType')) query.jobType = searchParams.get('jobType')
    if (searchParams.get('experience')) query.experience = searchParams.get('experience')

    const totalJobs = await db.collection('jobs').countDocuments(query)
    const jobs = await db.collection('jobs')
      .find(query)
      .sort({ datePosted: -1 })
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

