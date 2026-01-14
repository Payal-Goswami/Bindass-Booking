export default function ListingCard({ listing, onSelect }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 12 }}>
      <h3>{listing.name}</h3>
      <p>Type: {listing.type}</p>
      <p>Capacity: {listing.capacity}</p>

      <button onClick={() => onSelect(listing)}>
        View Availability
      </button>
    </div>
  );
}
