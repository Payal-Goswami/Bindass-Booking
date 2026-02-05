import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAvailability } from '../services/availability.api';
import { createBooking } from '../services/booking.api';
import { generateDaySlotsUTC, isSlotFree } from '../utils/slots';
import SlotGrid from '../components/SlotGrid';
import { supabase } from '../auth/supabase';

export default function Availability() {
  const { resourceId } = useParams();

  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!date) return;

    setLoading(true);
    setSelectedSlots([]);

    fetchAvailability(resourceId, date)
      .then(freeSlots => {
        const daySlots = generateDaySlotsUTC(date);

        setSlots(
          daySlots.map(slot => ({
            ...slot,
            free: isSlotFree(slot, freeSlots),
            selected: false,
            label: `${slot.start.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })} - ${slot.end.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}`
          }))
        );
      })
      .finally(() => setLoading(false));
  }, [date, resourceId]);

  function handleSelect(slot) {
    if (!slot.free) return;

    const updated = [...selectedSlots, slot].sort(
      (a, b) => a.start - b.start
    );

    // Ensure continuity
    for (let i = 1; i < updated.length; i++) {
      if (updated[i - 1].end.getTime() !== updated[i].start.getTime()) {
        return;
      }
    }

    setSelectedSlots(updated);

    setSlots(slots =>
      slots.map(s => ({
        ...s,
        selected: updated.some(u => u.start.getTime() === s.start.getTime())
      }))
    );
  }

  async function handleBooking() {
    try {
        const { data, error } = await supabase.auth.getSession();

        if (!data.session) {
          setMessage({
            type: 'error',
            text: 'Please login to book slots'
          });
          return;
        }

        const token = data.session.access_token;


      await createBooking({
        resourceId,
        startTime: selectedSlots[0].start.toISOString(),
        endTime: selectedSlots[selectedSlots.length - 1].end.toISOString(),
        token
      });

      setMessage({ type: 'success', text: 'Booking confirmed 🎉' });
      setDate(date); 
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  return (
    <>
      <h2>Availability</h2>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      {message && (
        <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>
          {message.text}
        </p>
      )}

      {loading && <p>Loading slots...</p>}

      {!loading && slots.length > 0 && (
        <>
          <SlotGrid slots={slots} onSelect={handleSelect} />

          {selectedSlots.length > 0 && (
            <button
              onClick={handleBooking}
              style={{ marginTop: 20, padding: '10px 20px' }}
            >
              Book Selected Slots
            </button>
          )}
        </>
      )}
    </>
  );
}
