import { useEffect, useState } from 'react';
import { supabase } from '../auth/supabase';
import { fetchMyBookings, cancelBooking } from '../services/myBookings.api';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  async function loadBookings() {
    setLoading(true);

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
       console.log("No session yet, please wait...");
      //  setLoading(false);
       return;
    }
    const token = data.session.access_token;
    const result = await fetchMyBookings(token);

    setBookings(result);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleCancel(id) {
    if (!window.confirm('Cancel this booking?')) return;

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session.access_token;

      await cancelBooking(id, token);
      setMessage('Booking cancelled successfully');
      loadBookings();
    } catch (err) {
      setMessage('Failed to cancel booking:(');
    }
  }

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>My Bookings</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <div
          key={b.id}
          style={{
            padding: 15,
            marginBottom: 15,
            border: '1px solid #ddd',
            borderRadius: 6
          }}
        >
          <b>{b.resources?.name}</b>

          <p>
            {new Date(b.start_time).toLocaleDateString()} <br />
            {new Date(b.start_time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
            {' - '}
            {new Date(b.end_time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>

          <p>Status: <b>{b.status}</b></p>

          {b.status === 'CONFIRMED' && (
            <button onClick={() => handleCancel(b.id)}>
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
