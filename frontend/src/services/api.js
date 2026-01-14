const API_BASE = 'http://localhost:8080';

export async function fetchResources() {
  const res = await fetch(`${API_BASE}/resources`);
  if (!res.ok) throw new Error('Failed to fetch resources:(');
  return res.json();
}
