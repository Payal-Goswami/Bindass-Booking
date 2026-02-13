// import { useEffect, useState } from 'react';
// import { fetchResources } from '../services/resources.api';
// import FilterBar from '../components/FilterBar';
// import ResourceCard from '../components/ResourceCard';

// export default function Home() {
//   const [resources, setResources] = useState([]);
//   const [filter, setFilter] = useState('ALL');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchResources()
//       .then(setResources)
//       .finally(() => setLoading(false));
//   }, []);

//   const filteredResources =
//     filter === 'ALL'
//       ? resources
//       : resources.filter(r => r.type === filter);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <FilterBar selected={filter} onChange={setFilter} />

//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//         gap: '20px'
//       }}>
//         {filteredResources.map(resource => (
//           <ResourceCard key={resource.id} resource={resource} />
//         ))}
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from 'react';
import { fetchResources } from '../services/resources.api';
import FilterBar from '../components/FilterBar';
import ResourceCard from '../components/ResourceCard';
import '../styles/Home.css';

export default function Home() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources()
      .then(setResources)
      .finally(() => setLoading(false));
  }, []);

  const filteredResources =
    filter === 'ALL'
      ? resources
      : resources.filter(r => r.type === filter);

  if (loading) return <p className="loading-text">Loading resources...</p>;

  return (
    <div className="home-container">
      <FilterBar selected={filter} onChange={setFilter} />

      <div className="resource-grid">
        {filteredResources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
