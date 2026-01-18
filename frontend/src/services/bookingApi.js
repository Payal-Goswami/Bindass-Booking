const API = 'http://localhost:8080';

export async function fetchAvailability(resourceId, date) {
  const res = await fetch(
    `${API}/resources/${resourceId}/availability?date=${date}`
  );
  if (!res.ok) throw new Error('Failed to load availability:(');
  return res.json();
}

export async function bookSlot(payload, accessToken) {
  const res = await fetch(`${API}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Booking failed');
  }
}
