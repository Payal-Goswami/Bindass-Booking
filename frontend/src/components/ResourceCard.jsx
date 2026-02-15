import { useNavigate } from "react-router-dom";
import "../styles/ResourceCard.css";

export default function ResourceCard({ resource }) {
  const navigate = useNavigate();

  return (
    <div className="resource-card">
      <img
        // src="https://picsum.photos/400/250"
        src={resource.image}
        alt={resource.name}
        className="resource-image"
      />

      <div className="resource-content">
        <h3 className="resource-title">{resource.name}</h3>
        <p className="resource-meta">Type: {resource.type}</p>
        <p className="resource-meta">Capacity: {resource.capacity}</p>
        <p className="resource-meta">{resource.description}</p>

        <button
          className="resource-button"
          onClick={() => navigate(`/resources/${resource.id}`)}
        >
          View Availability
        </button>
      </div>
    </div>
  );
}
