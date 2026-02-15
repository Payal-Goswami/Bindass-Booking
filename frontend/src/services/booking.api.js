const API_URL = 'https://bindass-booking.onrender.com';

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
