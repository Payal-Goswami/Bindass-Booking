import "../styles/SlotGrid.css";

export default function SlotGrid({ slots, onSelect }) {
  return (
    <div className="slot-grid">
      {slots.map((slot, idx) => {
        let className = "slot-tile ";
        if (!slot.free) className += "slot-booked";
        else if (slot.selected) className += "slot-selected";
        else className += "slot-free";

        return (
          <button
            key={idx}
            disabled={!slot.free}
            onClick={() => onSelect(slot)}
            className={className}
          >
            {slot.label}
          </button>
        );
      })}
    </div>
  );
}
