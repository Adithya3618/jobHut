import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db('jobhut')
    
    const job = await db.collection('jobs').findOne({
      _id: new ObjectId(params.id)
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    const serializedJob = {
      ...job,
      _id: job._id.toString(),
      datePosted: job.datePosted ? new Date(job.datePosted).toISOString() : null,
      lastDate: job.lastDate ? new Date(job.lastDate).toISOString() : null,
      expirationDate: job.expirationDate ? new Date(job.expirationDate).toISOString() : null
    }

    return NextResponse.json(serializedJob)
  } catch (error) {
    console.error('Error in GET /api/jobs/[id]:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db('jobhut')
    
    const updatedJob = await request.json()
    const { _id, ...jobWithoutId } = updatedJob

    const result = await db.collection('jobs').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: jobWithoutId }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in PUT /api/jobs/[id]:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db('jobhut')
    
    const result = await db.collection('jobs').deleteOne({
      _id: new ObjectId(params.id)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/jobs/[id]:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

