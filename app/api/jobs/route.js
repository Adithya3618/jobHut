import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { verifyToken } from '../../lib/auth';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db('jobhut');

    // Build query dynamically
    const query = {};
    if (searchParams.has('keyword')) {
      const keyword = searchParams.get('keyword');
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { companyName: { $regex: keyword, $options: 'i' } },
        { overview: { $regex: keyword, $options: 'i' } },
      ];
    }
    if (searchParams.has('location')) {
      query.location = { $regex: searchParams.get('location'), $options: 'i' };
    }
    if (searchParams.has('jobType')) {
      query.jobType = searchParams.get('jobType');
    }
    if (searchParams.has('experience')) {
      query.experience = searchParams.get('experience');
    }
    if (searchParams.has('category')) {
      query.category = searchParams.get('category');
    }
    if (searchParams.has('subCategory')) {
      query.subCategory = searchParams.get('subCategory');
    }
    if (searchParams.has('salary')) {
      query.salary = { $gte: parseInt(searchParams.get('salary'), 10) };
    }

    const totalJobs = await db.collection('jobs').countDocuments(query);
    const jobs = await db.collection('jobs')
      .find(query)
      .sort({ datePosted: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Serialize jobs for response
    const serializedJobs = jobs.map((job) => ({
      ...job,
      _id: job._id.toString(),
      datePosted: job.datePosted ? new Date(job.datePosted).toISOString() : null,
      lastDate: job.lastDate ? new Date(job.lastDate).toISOString() : null,
      expirationDate: job.expirationDate ? new Date(job.expirationDate).toISOString() : null,
    }));

    return NextResponse.json({
      jobs: serializedJobs,
      total: totalJobs,
      page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    console.error('Error in GET /api/jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const jobData = await request.json();
    const client = await clientPromise;
    const db = client.db('jobhut');

    // Set the datePosted field to the current date
    jobData.datePosted = new Date();

    const result = await db.collection('jobs').insertOne(jobData);

    return NextResponse.json({ success: true, _id: result.insertedId.toString() });
  } catch (error) {
    console.error('Error in POST /api/jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
