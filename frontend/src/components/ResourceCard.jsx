import { useNavigate } from "react-router-dom";
import "../styles/ResourceCard.css";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop";

export default function ResourceCard({ resource }) {
  const navigate = useNavigate();

  return (
    <div className="resource-card">
      <img
        src={resource.image || FALLBACK_IMAGE}
        alt={resource.name}
        className="resource-image"
        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
      />
      <div className="resource-content">
        <h3 className="resource-title">{resource.name}</h3>
        <p className="resource-meta">Type: {resource.type}</p>
        <p className="resource-meta">Capacity: {resource.capacity}</p>
        {resource.description && (
          <p className="resource-meta">{resource.description}</p>
        )}
        <button
          className="resource-button"
          onClick={() => navigate(`/availability/${resource.id}`)}
        >
          View Availability
        </button>
      </div>
    </div>
  );
}
