import { useEffect, useState } from "react";
import { supabase } from "../auth/supabase";
import { fetchMyBookings, cancelBooking } from "../services/myBookings.api.js";
import "../styles/MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  async function loadBookings() {
    setLoading(true);

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      console.log("No session yet, please wait...");
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

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  async function handleCancel(id) {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session.access_token;
      await cancelBooking(id, token);

      setMessage("Booking cancelled successfully");
      loadBookings();
    } catch (err) {
      setMessage("Failed to cancel booking");
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading bookings...</p>;

  return (
    <div className="mybookings-container">
      <div className="mybookings-wrapper">
        <h2 className="mybookings-title">My Bookings</h2>

        {message && (
          <div
            className={
              message.includes("Failed")
                ? "booking-message error"
                : "booking-message success"
            }
          >
            {message}
          </div>
        )}

        {bookings.length === 0 && (
          <p style={{ color: "#64748b" }}>No bookings yet</p>
        )}

        {bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <div className="booking-title">{b.resources?.name}</div>

            <div className="booking-time">
              {new Date(b.start_time).toLocaleDateString()} <br />
              {new Date(b.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {new Date(b.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <span className="status-badge status-confirmed">{b.status}</span>

            {b.status === "CONFIRMED" && (
              <button
                className="cancel-button"
                onClick={() => handleCancel(b.id)}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
