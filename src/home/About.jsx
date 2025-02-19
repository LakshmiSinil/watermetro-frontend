import React from "react";
import { FaShip, FaClock, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import './about.css';


const features = [
  {
    icon: FaShip,
    title: "Modern Fleet",
    description: "State-of-the-art electric boats with advanced safety features",
  },
  {
    icon: FaClock,
    title: "Frequent Service",
    description: "Regular schedules with minimal waiting time",
  },
  {
    icon: FaUsers,
    title: "Passenger Comfort",
    description: "Air-conditioned boats with comfortable seating",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Wide Coverage",
    description: "Connecting multiple islands to the mainland",
  },
];

export function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">About Water Metro</h2>
          <p className="section-description">
            An integrated water transport system providing modern, safe, and comfortable travel experience across waterways.
          </p>
        </div>

        <div className="content-grid">
          <div className="image-container">
            <img src="https://cdn-dev.watermetro.co.in/boat0001_7dd6617bec.png" alt="Water Metro Boat" className="image" />
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <feature.icon className="feature-icon" />
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
