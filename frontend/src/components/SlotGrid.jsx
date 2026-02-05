export default function SlotGrid({ slots, onSelect }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '12px',
      marginTop: '20px'
    }}>
      {slots.map((slot, idx) => (
        <button
          key={idx}
          disabled={!slot.free}
          onClick={() => onSelect(slot)}
          style={{
            padding: '10px',
            borderRadius: '6px',
            cursor: slot.free ? 'pointer' : 'not-allowed',
            backgroundColor: slot.selected
              ? '#bee5eb'
              : slot.free
              ? '#d4edda'
              : '#f8d7da',
            border: '1px solid #ccc',
            fontWeight: 500
          }}
        >
          {slot.label}
        </button>
      ))}
    </div>
  );
}
