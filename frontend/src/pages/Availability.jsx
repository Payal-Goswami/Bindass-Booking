import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAvailability } from "../services/availability.api";
import { createBooking } from "../services/booking.api";
import { generateDaySlotsUTC, isSlotFree } from "../utils/slots";
import SlotGrid from "../components/SlotGrid";
import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabase";
import "../styles/Availability.css";
export default function Availability() {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
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
              label: `${slot.start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${slot.end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`,
            };
          }),
        );
      })
      .finally(() => setLoading(false));
  }, [date, resourceId]);

  function handleSelect(slot) {
    if (!slot.free) return;

    let updated;

    const exists = selectedSlots.some(
      (s) => s.start.getTime() === slot.start.getTime(),
    );

    if (exists) {
      updated = selectedSlots.filter(
        (s) => s.start.getTime() !== slot.start.getTime(),
      );
    } else {
      updated = [...selectedSlots, slot];
    }

    setSelectedSlots(updated);

    setSlots((prev) =>
      prev.map((s) => ({
        ...s,
        selected: updated.some((u) => u.start.getTime() === s.start.getTime()),
      })),
    );
  }
  async function handleBooking() {
    try {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setMessage({
          type: "error",
          text: "Please login to book slots",
        });
        return;
      }

      const token = data.session.access_token;

      for (const slot of selectedSlots) {
        await createBooking({
          resourceId,
          startTime: slot.start.toISOString(),
          endTime: slot.end.toISOString(),
          token,
        });
      }

      setMessage({
        type: "success",
        text: "Booking confirmed 🎉 Redirecting to My Bookings...",
      });

      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="availability-container">
      <div className="availability-card">
        <div className="availability-header">
          <h2 className="availability-title">Choose Your Slot</h2>

          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
        </div>
        {message && (
          <div className="message-overlay">
            <div
              className={
                message.type === "success" ? "message-success" : "message-error"
              }
            >
              {message.text}
            </div>
          </div>
        )}

        <div className="slot-section">
          <SlotGrid slots={slots} onSelect={handleSelect} />
        </div>

        {selectedSlots.length > 0 && (
          <button onClick={handleBooking} className="book-button">
            Book Selected Slots
          </button>
        )}
      </div>
    </div>
  );
}
