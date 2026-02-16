import "../styles/FilterBar.css";
const CATEGORIES = ["ALL", "CORPORATE", "CAMPUS", "LEISURE"];
export default function FilterBar({ selected, onChange }) {
  return (
    <div className="filter-container">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`filter-button ${selected === cat ? "active" : ""}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
