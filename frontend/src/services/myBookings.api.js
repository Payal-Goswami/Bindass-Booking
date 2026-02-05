const API_URL = 'http://localhost:8080';

export async function fetchMyBookings(token) {
  const res = await fetch(`${API_URL}/userBookings/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to load bookings:(');
  return res.json();
}

export async function cancelBooking(id, token) {
  const res = await fetch(`${API_URL}/userBookings/${id}/cancel`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Cancel failed!');
}
