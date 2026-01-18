import { useEffect, useState } from 'react';
import { fetchAvailability, bookSlot } from '../services/bookingApi';
import AvailabilityGrid from '../components/AvailabilityGrid';
import { supabase } from '../auth/supabase';

// export default function Booking({ resource }) {
//   const [date, setDate] = useState('2026-01-20');
//   const [slots, setSlots] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAvailability(resource.id, date)
//       .then(setSlots)
//       .catch(err => setError(err.message));
//   }, [resource.id, date]);

//   const handleBook = async slot => {
//     try {
//       const session = await supabase.auth.getSession();
//       const token = session.data.session.access_token;

//       await bookSlot(
//         {
//           resourceId: resource.id,
//           start: `${date}T${slot.start}:00Z`,
//           end: `${date}T${slot.end}:00Z`
//         },
//         token
//       );

//       alert('Booking confirmed!');
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Book {resource.name}</h2>

//       <input
//         type="date"
//         value={date}
//         onChange={e => setDate(e.target.value)}
//       />

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <AvailabilityGrid slots={slots} onSelect={handleBook} />
//     </div>
//   );
// }



export default function Booking({ resource }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchAvailability(resource.id, '2026-01-20')
      .then(setSlots);
  }, [resource.id]);

  return (
    <div>
      <h2>{resource.name}</h2>

      {slots.map((s, i) => (
        <button key={i} style={{ margin: 8 }}>
          {new Date(s.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {' - '}
          {new Date(s.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </button>
      ))}
    </div>
  );
}
