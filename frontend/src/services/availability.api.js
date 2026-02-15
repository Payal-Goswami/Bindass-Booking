const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAvailability(resourceId, date) {
  const res = await fetch(
    `${API_URL}/resources/${resourceId}/?date=${date}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch availability:(');
  }

  return res.json();
}
