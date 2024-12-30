import clientPromise from '../../app/lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('jobhut');
    const jobs = await db.collection('jobs')
      .find()
      .sort({ datePosted: -1 })
      .limit(6)
      .toArray();

    const serializedJobs = jobs.map(job => ({
      ...job,
      _id: job._id.toString(),
      datePosted: job.datePosted ? new Date(job.datePosted).toISOString() : null,
      lastDate: job.lastDate ? new Date(job.lastDate).toISOString() : null,
      expirationDate: job.expirationDate ? new Date(job.expirationDate).toISOString() : null,
    }));

    res.status(200).json(serializedJobs);
  } catch (error) {
    console.error('Error in recent-jobs API:', error);
    res.status(500).json({ error: 'Failed to fetch recent jobs' });
  }
}

