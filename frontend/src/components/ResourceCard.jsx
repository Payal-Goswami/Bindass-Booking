// import { useNavigate } from 'react-router-dom';

// export default function ResourceCard({ resource }) {
//   const navigate = useNavigate();

//   return (
//     <div style={{
//       border: '1px solid #ddd',
//       borderRadius: 8,
//       padding: 16
//     }}>
//       <img
//         src="demo image link"
//         alt={resource.name}
//         style={{ width: '100%', borderRadius: 4 }}
//       />

//       <h3>{resource.name}</h3>
//       <p>Type: {resource.type}</p>
//       <p>Capacity: {resource.capacity}</p>
//       <p>Description: {resource.description}</p>

//       <button
//         onClick={() => navigate(`/resources/${resource.id}`)}
//         style={{ marginTop: 10 }}
//       >
//         View Availability
//       </button>
//     </div>
//   );
// }


import { useNavigate } from 'react-router-dom';
import '../styles/ResourceCard.css';

export default function ResourceCard({ resource }) {
  const navigate = useNavigate();

  return (
    <div className="resource-card">
      <img
        src="https://picsum.photos/400/250"
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
