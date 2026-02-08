import { useNavigate } from 'react-router-dom';

export default function ResourceCard({ resource }) {
  const navigate = useNavigate();

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16
    }}>
      <img
        src="demo image link"
        alt={resource.name}
        style={{ width: '100%', borderRadius: 4 }}
      />

      <h3>{resource.name}</h3>
      <p>Type: {resource.type}</p>
      <p>Capacity: {resource.capacity}</p>
      <p>Description: {resource.description}</p>

      <button
        onClick={() => navigate(`/resources/${resource.id}`)}
        style={{ marginTop: 10 }}
      >
        View Availability
      </button>
    </div>
  );
}
