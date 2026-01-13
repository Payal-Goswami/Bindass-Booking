import fetch from 'node-fetch';

const API_URL = 'http://localhost:8080/bookings';

const RESOURCE_ID = '11e55a9f-5de6-4517-8dcd-cf674ea61bbd'; 

const START_TIME = '2026-01-20T11:00:00Z';
const END_TIME = '2026-01-20T12:00:00Z';

const TOTAL_REQUESTS = 50;

async function fireRequest(i) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resourceId: RESOURCE_ID,
        startTime: START_TIME,
        endTime: END_TIME
      })
    });

    const body = await res.json();
    return { status: res.status, body };
  } catch (err) {
    return { error: err.message };
  }
}

async function run() {
  const promises = [];

  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    promises.push(fireRequest(i));
  }

  const results = await Promise.all(promises);

  const success = results.filter(r => r.status === 201).length;
  const conflicts = results.filter(r => r.status === 409).length;

  console.log('Success:', success);
  console.log('Conflicts:', conflicts);
}

run();







