import { useEffect, useState } from "react";
import { fetchResources } from "../services/resources.api.js";
import FilterBar from "../components/FilterBar.jsx";
import ResourceCard from "../components/ResourceCard.jsx";
import "../styles/Home.css";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResources()
      .then(setResources)
      .catch(() => setError("Failed to load resources. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = resources.filter((r) => {
    const matchesFilter = filter === "ALL" || r.type === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <p className="loading-text">Loading resources...</p>;
  }

  if (error) {
    return <p className="loading-text" style={{ color: "#ef4444" }}>{error}</p>;
  }

  return (
    <div className="home-container">
      <div className="home-top-bar">
        <FilterBar selected={filter} onChange={setFilter} />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No resources found</p>
          <span>Try a different filter or search term</span>
        </div>
      ) : (
        <div className="resource-grid">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
