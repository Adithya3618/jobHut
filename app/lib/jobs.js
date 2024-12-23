import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

/**
 * Helper function to serialize job data.
 * Converts MongoDB ObjectId to string and formats date fields to ISO strings.
 */
function serializeJob(job) {
  if (!job) return null;
  return {
    ...job,
    _id: job._id.toString(),
    datePosted: job.datePosted ? new Date(job.datePosted).toISOString() : null,
    lastDate: job.lastDate ? new Date(job.lastDate).toISOString() : null,
    expirationDate: job.expirationDate ? new Date(job.expirationDate).toISOString() : null,
  };
}

/**
 * Fetches the most recent jobs.
 * @param {number} limit - Number of jobs to fetch. Default is 6.
 * @returns {Promise<Array>} - Array of recent job objects.
 */
export async function getRecentJobs(limit = 6) {
  try {
    const client = await clientPromise;
    const db = client.db('jobhut');
    const jobs = await db
      .collection('jobs')
      .find()
      .sort({ datePosted: -1 })
      .limit(limit)
      .toArray();
    return jobs.map(serializeJob);
  } catch (error) {
    console.error('Error in getRecentJobs:', error);
    return [];
  }
}

/**
 * Fetches all jobs from the database.
 * @returns {Promise<Array>} - Array of all job objects.
 */
export async function getAllJobs() {
  try {
    const client = await clientPromise;
    const db = client.db('jobhut');
    const jobs = await db.collection('jobs').find().toArray();
    return jobs.map(serializeJob);
  } catch (error) {
    console.error('Error in getAllJobs:', error);
    return [];
  }
}

/**
 * Fetches a specific job by its ID.
 * @param {string} id - The job ID.
 * @returns {Promise<Object|null>} - The job object or null if not found.
 */
export async function getJobById(id) {
  try {
    const client = await clientPromise;
    const db = client.db('jobhut');
    const job = await db.collection('jobs').findOne({ _id: new ObjectId(id) });
    return serializeJob(job);
  } catch (error) {
    console.error('Error in getJobById:', error);
    return null;
  }
}

/**
 * Searches for jobs based on various parameters.
 * @param {Object} params - Search parameters (category, keyword, jobType, etc.).
 * @returns {Promise<Array>} - Array of matching job objects.
 */
export async function searchJobs(params = {}) {
  try {
    const client = await clientPromise;
    const db = client.db('jobhut');
    const query = {};

    // Build the query based on provided parameters
    const {
      category,
      keyword,
      jobType,
      location,
      salary,
      experience,
      qualification,
    } = params;

    if (category) query.category = category;

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { companyName: { $regex: keyword, $options: 'i' } },
        { subCategory: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (jobType) query.jobType = jobType;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (salary) query.salary = { $regex: salary, $options: 'i' };
    if (experience) query.experience = { $regex: experience, $options: 'i' };
    if (qualification) query.qualification = { $regex: qualification, $options: 'i' };

    console.log('Search query:', query); // Debug logging

    const jobs = await db.collection('jobs').find(query).toArray();
    return jobs.map(serializeJob);
  } catch (error) {
    console.error('Error in searchJobs:', error);
    return [];
  }
}

/**
 * Fetches jobs similar to a given subCategory.
 * @param {string} subCategory - The subCategory to match.
 * @param {number} limit - Number of similar jobs to fetch. Default is 10.
 * @returns {Promise<Array>} - Array of similar job objects.
 */
export async function getSimilarJobs(subCategory, limit = 10) {
  try {
    const client = await clientPromise;
    const db = client.db('jobhut');
    const jobs = await db
      .collection('jobs')
      .find({ subCategory })
      .limit(limit)
      .toArray();
    return jobs.map(serializeJob);
  } catch (error) {
    console.error('Error in getSimilarJobs:', error);
    return [];
  }
}
