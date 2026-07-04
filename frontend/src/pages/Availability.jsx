import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAvailability } from "../services/availability.api.js";
import { createBooking } from "../services/booking.api.js";
import { generateDaySlotsUTC, isSlotFree } from "../utils/slots.js";
import SlotGrid from "../components/SlotGrid.jsx";
import { supabase } from "../auth/supabase";
import { useAuth } from "../context/AuthContext";
import "../styles/Availability.css";

export default function Availability() {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!date) return;

    setLoading(true);
    setSelectedSlots([]);

    fetchAvailability(resourceId, date)
      .then((freeSlots) => {
        const daySlots = generateDaySlotsUTC(date);
        const now = new Date();

        setSlots(
          daySlots.map((slot) => {
            const isPast = slot.end < now;
            return {
              ...slot,
              free: isPast ? false : isSlotFree(slot, freeSlots),
              selected: false,
              label: `${slot.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${slot.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
            };
          })
        );
      })
      .catch(() => {
        setMessage({ type: "error", text: "Failed to load availability. Please try again." });
      })
      .finally(() => setLoading(false));
  }, [date, resourceId]);

  function handleSelect(slot) {
    if (!slot.free) return;

    const exists = selectedSlots.some((s) => s.start.getTime() === slot.start.getTime());
    const updated = exists
      ? selectedSlots.filter((s) => s.start.getTime() !== slot.start.getTime())
      : [...selectedSlots, slot];

    setSelectedSlots(updated);
    setSlots((prev) =>
      prev.map((s) => ({
        ...s,
        selected: updated.some((u) => u.start.getTime() === s.start.getTime()),
      }))
    );
  }

  async function handleBooking() {
    if (!user) {
      navigate("/login", {
        state: {
          message: "Please login to book slots",
          redirectTo: `/availability/${resourceId}`,
        },
      });
      return;
    }

    setBooking(true);

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session.access_token;

      for (const slot of selectedSlots) {
        await createBooking({
          resourceId,
          startTime: slot.start.toISOString(),
          endTime: slot.end.toISOString(),
          token,
        });
      }

      setMessage({ type: "success", text: "Booking confirmed 🎉 Redirecting..." });
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Booking failed. Please try again." });
    } finally {
      setBooking(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const sortedSelected = [...selectedSlots].sort((a, b) => a.start - b.start);

  return (
    <div className="availability-card">
      <div className="availability-header">
        <h2 className="availability-title">Select Available Slots</h2>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
        />
      </div>

      {message && (
        <div className="message-overlay" onClick={() => setMessage(null)}>
          <div className={message.type === "success" ? "message-success" : "message-error"}>
            {message.text}
          </div>
        </div>
      )}

      {!date ? (
        <div className="empty-state-slots">
          <p>📅 Select a date to see available slots</p>
        </div>
      ) : loading ? (
        <p style={{ padding: "20px", color: "#64748b" }}>Loading slots...</p>
      ) : (
        <div className="availability-layout">
          <div className="slot-section">
            {slots.length === 0 ? (
              <p style={{ color: "#64748b" }}>No slots available for this date.</p>
            ) : (
              <SlotGrid slots={slots} onSelect={handleSelect} />
            )}
          </div>

          <div className="booking-panel">
            <h4>Booking Summary</h4>

            {sortedSelected.length > 0 ? (
              <>
                <div className="booking-summary-list">
                  {sortedSelected.map((s, i) => (
                    <div key={i} className="summary-slot-item">{s.label}</div>
                  ))}
                </div>
                <div className="booking-summary-count">
                  {sortedSelected.length} slot{sortedSelected.length > 1 ? "s" : ""} selected
                </div>
                <button
                  onClick={handleBooking}
                  className="book-button"
                  disabled={booking}
                >
                  {booking ? "Confirming..." : "Confirm Booking"}
                </button>
              </>
            ) : (
              <p className="booking-summary">Select slots to book</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
