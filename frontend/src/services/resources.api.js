const API_URL = 'https://bindass-booking.onrender.com';

export async function fetchResources() {
  const res = await fetch(`${API_URL}/resources`);
  if (!res.ok) throw new Error('Failed to fetch resources:(');
  return res.json();
}
