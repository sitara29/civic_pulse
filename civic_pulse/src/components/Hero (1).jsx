import React from "react";
import { Link } from "react-router-dom";
import CityIllustration from "./CityIllustration";

function Hero() {
  return (
    <section className="cp-hero" aria-labelledby="hero-title">
      <div className="cp-hero-glow cp-hero-glow-one" />
      <div className="cp-hero-glow cp-hero-glow-two" />

      <div className="cp-hero-inner">
        <div className="cp-hero-copy">
          <div className="cp-hero-eyebrow">
            <span className="cp-live-dot" />
            Hyderabad civic network · Live
          </div>

          <h1 id="hero-title">
            Your city.
            <br />
            <span>Your voice.</span>
          </h1>

          <p className="cp-hero-text">
            Spot a problem. Report it in seconds. CivicPulse helps turn
            everyday citizen reports into visible, trackable action.
          </p>

          <div className="cp-hero-actions">
            <Link to="/register" className="cp-button cp-button-primary cp-hero-primary">
              Report a Civic Issue
              <span>→</span>
            </Link>

            <a href="#how-it-works" className="cp-button cp-button-secondary">
              See how it works
            </a>
          </div>

          <div className="cp-hero-trust">
            <div className="cp-trust-avatars" aria-hidden="true">
              <span>R</span>
              <span>A</span>
              <span>S</span>
              <span>+</span>
            </div>

            <p>
              <strong>Citizens + civic teams</strong>
              <br />
              working from the same complaint trail
            </p>
          </div>
        </div>

        <div className="cp-hero-visual" id="city-pulse">
          <CityIllustration />
        </div>
      </div>

      <div className="cp-hero-bottom">
        <span>SEE IT</span>
        <i />
        <span>REPORT IT</span>
        <i />
        <span>PRIORITIZE IT</span>
        <i />
        <span>RESOLVE IT</span>
      </div>
    </section>
  );
}

export default Hero;
