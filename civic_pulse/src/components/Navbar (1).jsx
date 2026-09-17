import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="cp-navbar">
      <div className="cp-navbar-inner">
        <Link to="/" className="cp-brand" onClick={closeMenu}>
          <span className="cp-brand-mark" aria-hidden="true">
            ✦
          </span>

          <span className="cp-brand-copy">
            <strong>
              Civic<span>Pulse</span>
            </strong>
            <small>Smart Civic Complaint Management</small>
          </span>
        </Link>

        <button
          type="button"
          className="cp-menu-button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`cp-nav ${menuOpen ? "is-open" : ""}`}>
          <a href="#how-it-works" onClick={closeMenu}>
            How it works
          </a>

          <a href="#city-pulse" onClick={closeMenu}>
            City Pulse
          </a>

          <Link to="/login" className="cp-nav-login" onClick={closeMenu}>
            Login
          </Link>

          <Link to="/register" className="cp-nav-cta" onClick={closeMenu}>
            Report an Issue <span>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
