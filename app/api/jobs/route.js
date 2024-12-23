import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('jobhut')
    const jobs = await db.collection('jobs').find({}).toArray()
    
    const serializedJobs = jobs.map(job => ({
      ...job,
      _id: job._id.toString(),
      datePosted: job.datePosted ? new Date(job.datePosted).toISOString() : null,
      lastDate: job.lastDate ? new Date(job.lastDate).toISOString() : null,
      expirationDate: job.expirationDate ? new Date(job.expirationDate).toISOString() : null
    }))
    
    return NextResponse.json(serializedJobs)
  } catch (error) {
    console.error('Error in GET /api/jobs:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const jobData = await request.json()
    const client = await clientPromise
    const db = client.db('jobhut')
    
    const job = {
      ...jobData,
      datePosted: new Date(),
      expirationDate: new Date(jobData.lastDate)
    }
    
    const result = await db.collection('jobs').insertOne(job)
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId.toString() 
    })
  } catch (error) {
    console.error('Error in POST /api/jobs:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}

