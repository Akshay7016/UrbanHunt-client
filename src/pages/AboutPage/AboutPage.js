import { Link } from 'react-router-dom';

import './AboutPage.scss';

export const AboutPage = () => (
  <div className="aboutPage">
    <div className="about">
      <h1>About UrbanHunt</h1>
      <p>
        Welcome to UrbanHunt! We are dedicated to helping you discover the best
        urban experiences in your city. From hidden gems to popular hotspots,
        UrbanHunt is your go-to guide for urban exploration.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to connect urban explorers with the vibrant culture,
        events, and places that make each city unique. We strive to provide
        up-to-date information and honest reviews to enhance your urban
        adventures.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions, suggestions, or would like to contribute,
        feel free to <Link to="/contact">contact us</Link>.
      </p>
    </div>
  </div>
);
