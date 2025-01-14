import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'
import { verifyToken } from '../../lib/auth'
import { ObjectId } from 'mongodb'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'approved'

    const client = await clientPromise
    const db = client.db('jobhut')
    
    const query = { status: status }

    const blogs = await db.collection('blogs')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()
    
    const serializedBlogs = blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt ? blog.updatedAt.toISOString() : null
    }))
    
    return NextResponse.json({ blogs: serializedBlogs })
  } catch (error) {
    console.error('Error in GET /api/blogs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const blog = await request.json()
    const client = await clientPromise
    const db = client.db('jobhut')
    
    const newBlog = {
      ...blog,
      createdAt: new Date(),
      status: 'pending'
    }
    
    const result = await db.collection('blogs').insertOne(newBlog)
    return NextResponse.json({ success: true, _id: result.insertedId.toString() })
  } catch (error) {
    console.error('Error in POST /api/blogs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decodedToken = verifyToken(token)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { id, ...updateData } = await request.json()
    const client = await clientPromise
    const db = client.db('jobhut')
    
    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in PUT /api/blogs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decodedToken = verifyToken(token)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { id } = await request.json()
    const client = await clientPromise
    const db = client.db('jobhut')
    
    const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/blogs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

