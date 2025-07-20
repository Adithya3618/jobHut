const { MongoClient } = require('mongodb');

async function seed() {
  const client = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  const db = client.db('jobhut');
  const apis = [
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