const { MongoClient } = require('mongodb');

async function seed() {
  const client = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  const db = client.db('jobhut');
  const apis = [
    {
      id: 'remoteok',
      name: 'Remote OK',
      host: 'remoteok.io',
      endpoint: 'https://remoteok.io/api',
      key: '',
      enabled: true,
      notes: 'No auth required. Remote jobs in tech.'
    },
    {
      id: 'arbeitnow',
      name: 'Arbeitnow',
      host: 'api.arbeitnow.com',
      endpoint: 'https://api.arbeitnow.com/jobs',
      key: '',
      enabled: true,
      notes: 'No auth required. Jobs with categories like remote, visa sponsorship.'
    },
    {
      id: 'adzuna',
      name: 'Adzuna',
      host: 'api.adzuna.com',
      endpoint: 'https://api.adzuna.com/v1/api/jobs',
      key: 'YOUR_ADZUNA_API_KEY',
      enabled: true,
      notes: 'Requires API key. 100 free requests/day.'
    },
    {
      id: 'jooble',
      name: 'Jooble',
      host: 'jooble.org',
      endpoint: 'https://jooble.org/api',
      key: 'YOUR_JOOBLE_API_KEY',
      enabled: true,
      notes: 'Requires API key. International job search.'
    },
    {
      id: 'jsearch',
      name: 'JSearch (RapidAPI)',
      host: 'jsearch.p.rapidapi.com',
      endpoint: 'https://jsearch.p.rapidapi.com/search',
      key: 'YOUR_JSEARCH_API_KEY',
      enabled: true,
      notes: 'Free tier via RapidAPI. Fetch jobs by keyword, company, location.'
    },
    {
      id: 'githubjobs',
      name: 'GitHub Jobs Mirror',
      host: 'arbeitnow.com',
      endpoint: 'https://arbeitnow.com/api/job-board-api',
      key: '',
      enabled: true,
      notes: 'Mirror of GitHub Jobs. No auth required.'
    },
    {
      id: 'rapidapi',
      name: 'RapidAPI Jobs',
      host: 'active-jobs-db.p.rapidapi.com',
      endpoint: 'https://active-jobs-db.p.rapidapi.com/active-ats-24h',
      key: 'YOUR_RAPIDAPI_KEY',
      enabled: true
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Jobs',
      host: 'linkedin-job-search-api.p.rapidapi.com',
      endpoint: 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-24h',
      key: 'YOUR_LINKEDIN_API_KEY',
      enabled: true
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      host: '',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      key: 'YOUR_GEMINI_API_KEY',
      enabled: true
    }
  ];
  for (const api of apis) {
    await db.collection('external_apis').updateOne(
      { id: api.id },
      { $set: api },
      { upsert: true }
    );
  }
  console.log('Seeded external_apis collection.');
  await client.close();
}

seed(); 