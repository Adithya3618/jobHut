import { NextResponse } from 'next/server';
import { getApiConfig } from '../../lib/apiConfig';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '';
    const location = searchParams.get('location') || '';
    const apiSource = searchParams.get('source') || 'rapidapi';

    const config = await getApiConfig(apiSource);
    if (!config) {
      return NextResponse.json({ error: `API config for ${apiSource} not found or disabled` }, { status: 500 });
    }

    let url, options;
    if (apiSource === 'rapidapi') {
      url = `${config.endpoint}?limit=10&offset=0&title_filter="${encodeURIComponent(title)}"&location_filter="${encodeURIComponent(location)}"&description_type=text`;
      options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': config.key,
          'x-rapidapi-host': config.host
        }
      };
    } else if (apiSource === 'linkedin') {
      url = `${config.endpoint}?limit=20&offset=0&title_filter="${encodeURIComponent(title)}"&location_filter="${encodeURIComponent(location)}"`;
      options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': config.key,
          'x-rapidapi-host': config.host
        }
      };
    } else if (apiSource === 'remoteok') {
      url = config.endpoint;
      options = { method: 'GET' };
    } else {
      return NextResponse.json({ error: 'Invalid API source' }, { status: 400 });
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 429) {
        return NextResponse.json({
          error: 'API quota exceeded',
          message: 'The external API has reached its monthly limit. Please try again later or contact support.',
          details: errorText
        }, { status: 429 });
      }
      return NextResponse.json({
        error: 'External API error',
        message: `Failed to fetch jobs from ${apiSource}`,
        details: errorText
      }, { status: response.status });
    }

    let data = await response.json();
    let jobsArray = [];
    if (apiSource === 'remoteok') {
      // RemoteOK returns an array, first element is metadata, skip it
      if (Array.isArray(data)) {
        jobsArray = data.slice(1); // skip metadata
      } else {
        jobsArray = [];
      }
      // Filter by title and location
      const titleLower = title.trim().toLowerCase();
      const locationLower = location.trim().toLowerCase();
      jobsArray = jobsArray.filter(job => {
        const jobTitle = (job.position || '').toLowerCase();
        const jobLocation = (job.location || '').toLowerCase();
        const titleMatch = !titleLower || jobTitle.includes(titleLower);
        const locationMatch = !locationLower || jobLocation.includes(locationLower);
        return titleMatch && locationMatch;
      });
    } else if (Array.isArray(data)) {
      jobsArray = data;
    } else if (data.jobs && Array.isArray(data.jobs)) {
      jobsArray = data.jobs;
    } else if (data.data && Array.isArray(data.data)) {
      jobsArray = data.data;
    } else if (data.results && Array.isArray(data.results)) {
      jobsArray = data.results;
    } else {
      jobsArray = [];
    }

    return NextResponse.json({
      success: true,
      jobs: jobsArray,
      source: apiSource,
      count: jobsArray.length
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error',
      message: 'Failed to fetch external jobs',
      details: error.message
    }, { status: 500 });
  }
} 