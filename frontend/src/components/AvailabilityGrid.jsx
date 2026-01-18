export default function AvailabilityGrid({ slots, onSelect }) {
  return (
    <div>
      {slots.map(slot => (
        <button
          key={slot.start}
          disabled={!slot.available}
          onClick={() => onSelect(slot)}
          style={{
            display: 'block',
            marginBottom: 8,
            background: slot.available ? '#4caf50' : '#ccc'
          }}
        >
          {slot.start} - {slot.end}
        </button>
      ))}
    </div>
  );
}
