import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabase";
import { fetchMyBookings, cancelBooking } from "../services/myBookings.api.js";
import { useAuth } from "../context/AuthContext";
import "../styles/MyBookings.css";

export default function MyBookings() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login", { state: { message: "Please login to view your bookings", redirectTo: "/my-bookings" } });
      return;
    }

    loadBookings();
  }, [user, authLoading]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  async function loadBookings() {
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const result = await fetchMyBookings(data.session.access_token);
      setBookings(result);
    } catch {
      setMessage({ type: "error", text: "Failed to load bookings" });
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session.access_token;
      await cancelBooking(id, token);
      setMessage({ type: "success", text: "Booking cancelled" });
      loadBookings();
    } catch {
      setMessage({ type: "error", text: "Failed to cancel booking" });
    }
  }

  function canCancel(booking) {
    return booking.status === "CONFIRMED" && new Date(booking.start_time) > new Date();
  }

  function getStatusClass(status) {
    const map = {
      CONFIRMED: "status-confirmed",
      CANCELLED: "status-cancelled",
      PENDING: "status-pending",
    };
    return map[status] || "status-confirmed";
  }

  if (authLoading || loading) {
    return <p style={{ padding: 20, color: "#64748b" }}>Loading bookings...</p>;
  }

  return (
    <div className="mybookings-container">
      <div className="mybookings-wrapper">
        <h2 className="mybookings-title">My Bookings</h2>

        {message && (
          <div className={`booking-message ${message.type === "error" ? "error" : "success"}`}>
            {message.text}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bookings-empty">
            <p>No bookings yet</p>
            <span>Browse resources and book your first slot!</span>
            <button onClick={() => navigate("/")} className="go-home-button">
              Explore Resources
            </button>
          </div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-title">{b.resources?.name}</div>
              <div className="booking-time">
                {new Date(b.start_time).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                <br />
                {new Date(b.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                {" — "}
                {new Date(b.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <span className={`status-badge ${getStatusClass(b.status)}`}>{b.status}</span>

              {canCancel(b) && (
                <button className="cancel-button" onClick={() => handleCancel(b.id)}>
                  Cancel
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
