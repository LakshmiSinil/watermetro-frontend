import React from 'react';

import './hero.css'; // Import the CSS file

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video autoPlay loop muted className="background-video">
        <source src="https://cdn-dev.watermetro.co.in/video_1bf1d108c8.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="background-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Water Metro</h1>
        <p className="hero-text">
          Experience modern water transport system connecting islands to the mainland
        </p>
        <button className="hero-button">Plan Your Journey</button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <p>scroll down</p>
        <div className="scroll-icon">
          ▼ {/* Simple Downward Arrow (Unicode) */}
        </div>
      </div>

      {/* Ridership Updates */}
     
    </div>
  );
};

export default HeroSection;
