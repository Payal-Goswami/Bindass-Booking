const CATEGORIES = ['ALL', 'CORPORATE', 'CAMPUS', 'LEISURE'];

export default function FilterBar({ selected, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            marginRight: 10,
            fontWeight: selected === cat ? 'bold' : 'normal'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
