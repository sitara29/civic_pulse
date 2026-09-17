import React from "react";

function ComplaintMarker({ marker, active, onSelect }) {
  return (
    <button
      type="button"
      className={`cp-marker cp-marker-${marker.level} ${
        active ? "is-active" : ""
      }`}
      style={marker.position}
      onClick={onSelect}
      aria-label={`${marker.label} at ${marker.location}`}
    >
      <span className="cp-marker-pulse" />
      <span className="cp-marker-pin">●</span>

      {active && (
        <span className="cp-marker-card">
          <strong>{marker.label}</strong>
          <small>📍 {marker.location}</small>
          <em>{marker.level} priority</em>
        </span>
      )}
    </button>
  );
}

export default ComplaintMarker;
