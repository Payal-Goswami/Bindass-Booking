import { useEffect, useState } from 'react';
import { fetchResources } from '../services/api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';
import Booking from './booking';
import { supabase } from '../auth/supabase';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchResources()
      .then(setListings)
      .catch(err => setError(err.message));
  }, []);

   if (selected) {
    return <Booking resource={selected} />;
  }
  const filtered =
  filter === 'ALL'
    ? listings
    : listings.filter(
        l => l.type?.toUpperCase() === filter
      );


  return (
    <div style={{ padding: 40 }}>
      <h1>Available Spaces</h1>

      <FilterBar selected={filter} onChange={setFilter} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {filtered.map(l => (
        <ListingCard
          key={l.id}
          listing={l}
          onSelect={setSelected}
        />
      ))}

      <button onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
    </div>
  );
}
