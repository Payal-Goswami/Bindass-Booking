import { useEffect, useState } from "react";
import { fetchResources } from "../services/resources.api";
import FilterBar from "../components/FilterBar";
import ResourceCard from "../components/ResourceCard";
import "../styles/Home.css";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources()
      .then(setResources)
      .finally(() => setLoading(false));
  }, []);

  const filteredResources =
    filter === "ALL" ? resources : resources.filter((r) => r.type === filter);

  if (loading) return <p className="loading-text">Loading resources...</p>;

  return (
    <div className="home-container">
      <FilterBar selected={filter} onChange={setFilter} />
      <div className="resource-grid">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
