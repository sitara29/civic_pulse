CivicPulse Phase 1B

Added:
- Home.jsx
- Navbar.jsx
- Hero.jsx
- CityIllustration.jsx
- ComplaintMarker.jsx
- home.css

Integration:
1. Copy these files into the matching folders in your project.
2. In src/App.jsx add:
   import Home from "./pages/Home";
3. Change the "/" route from Navigate to Login to:
   <Route path="/" element={<Home />} />

Do NOT remove the other routes.
