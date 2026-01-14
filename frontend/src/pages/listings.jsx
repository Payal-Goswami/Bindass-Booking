import { useEffect, useState } from 'react';
import { fetchResources } from '../services/api';
import FilterBar from '../components/filterbar';
import ListingCard from '../components/listingcard';
import { supabase } from '../auth/supabase';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResources()
      .then(setListings)
      .catch(err => setError(err.message));
  }, []);

  const filtered =
    filter === 'ALL'
      ? listings
      : listings.filter(l => l.type === filter);

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Spaces</h1>

      <FilterBar selected={filter} onChange={setFilter} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {filtered.map(l => (
        <ListingCard
          key={l.id}
          listing={l}
          onSelect={() => alert('Next step')}
        />
      ))}

      <button onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
    </div>
  );
}
