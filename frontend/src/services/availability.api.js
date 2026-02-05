const API_URL = 'http://localhost:8080';

export async function fetchAvailability(resourceId, date) {
  const res = await fetch(
    `${API_URL}/resources/${resourceId}/?date=${date}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch availability:(');
  }

  return res.json();
}
