// insertJoobleConfig.js

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

async function run() {
  const client = new MongoClient(uri);
  console.log('Fetched jobs data:', data);
  try {
    await client.connect();
    const db = client.db('jobhut');
    const externalApis = db.collection('external_apis');

    const joobleApiKey = '043163f3-ba5a-4065-b850-229ebfe1f9bb';

    // Remove existing config with same ID
    await externalApis.deleteMany({ id: 'jooble' });

    const result = await externalApis.insertOne({
      id: "jooble",
      name: "Jooble",
      enabled: true,
      endpoint: `https://jooble.org/api/${joobleApiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      queryTemplate: {
        keywords: "{{keyword}}",
        location: "{{location}}"
      },
      jobsPath: "jobs",
      fieldMap: {
        title: "title",
        location: "location",
        company: "company",
        description: "snippet",
        type: "type",
        link: "link",
        updatedAt: "updated"
      }
    });

    console.log('✅ Jooble API config inserted:', result.insertedId);
  } catch (err) {
    console.error('❌ Error inserting Jooble API config:', err);
  } finally {
    await client.close();
  }
}

run();
