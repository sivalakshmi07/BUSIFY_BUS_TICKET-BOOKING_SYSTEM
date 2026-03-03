import React from 'react';
import './Hero.css';

const Hero = ({ children }) => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        {children}
      </div>
    </section>
  );
};

export default Hero;
