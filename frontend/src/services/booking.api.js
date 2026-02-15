const API_URL = import.meta.env.BASE_URL;

export async function createBooking({ resourceId, startTime, endTime, token }) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      resourceId,
      startTime,
      endTime
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}
