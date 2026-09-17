import React, { useState } from "react";
import ComplaintMarker from "./ComplaintMarker";

const markers = [
  {
    id: 1,
    level: "critical",
    label: "Water leakage",
    location: "Kukatpally",
    position: { top: "39%", left: "22%" },
  },
  {
    id: 2,
    level: "high",
    label: "Road damage",
    location: "Madhapur",
    position: { top: "57%", left: "58%" },
  },
  {
    id: 3,
    level: "medium",
    label: "Streetlight",
    location: "Shaikpet",
    position: { top: "30%", left: "72%" },
  },
  {
    id: 4,
    level: "low",
    label: "Waste collection",
    location: "Banjara Hills",
    position: { top: "69%", left: "34%" },
  },
];

function CityIllustration() {
  const [activeMarker, setActiveMarker] = useState(1);

  return (
    <div className="cp-city-scene">
      <div className="cp-map-topbar">
        <div>
          <span className="cp-map-status-dot" />
          CITY PULSE
        </div>

        <span>LIVE VIEW · HYDERABAD</span>
      </div>

      <div className="cp-map-grid" />

      <div className="cp-road cp-road-main" />
      <div className="cp-road cp-road-diagonal" />
      <div className="cp-road cp-road-cross" />

      <div className="cp-city-block block-a" />
      <div className="cp-city-block block-b" />
      <div className="cp-city-block block-c" />
      <div className="cp-city-block block-d" />
      <div className="cp-city-block block-e" />

      <div className="cp-landmark" aria-label="Civic landmark illustration">
        <span className="cp-landmark-dome" />
        <span className="cp-landmark-tower tower-one" />
        <span className="cp-landmark-tower tower-two" />
        <span className="cp-landmark-tower tower-three" />
        <span className="cp-landmark-tower tower-four" />
      </div>

      <div className="cp-floating-label cp-floating-label-one">
        <span>2.4k</span>
        active reports
      </div>

      <div className="cp-floating-label cp-floating-label-two">
        <span>91%</span>
        resolved trail
      </div>

      {markers.map((marker) => (
        <ComplaintMarker
          key={marker.id}
          marker={marker}
          active={activeMarker === marker.id}
          onSelect={() => setActiveMarker(marker.id)}
        />
      ))}

      <div className="cp-city-footer-card">
        <div className="cp-city-footer-icon">✓</div>
        <div>
          <strong>Every report leaves a trail.</strong>
          <span>From citizen submission to resolution.</span>
        </div>
      </div>
    </div>
  );
}

export default CityIllustration;
