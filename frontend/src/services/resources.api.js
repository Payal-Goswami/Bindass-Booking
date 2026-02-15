const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchResources() {
  const res = await fetch(`${API_URL}/resources`);
  if (!res.ok) throw new Error('Failed to fetch resources:(');
  return res.json();
}
