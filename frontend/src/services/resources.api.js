const API_URL = 'http://localhost:8080';

export async function fetchResources() {
  const res = await fetch(`${API_URL}/resources`);
  if (!res.ok) throw new Error('Failed to fetch resources:(');
  return res.json();
}
