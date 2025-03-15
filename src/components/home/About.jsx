import React from "react";
import { FaShip, FaClock, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

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
  const sectionStyle = {
    padding: "5rem 1rem",
    backgroundColor: "#ebe9e9",
    textAlign: "center",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
  };

  const descriptionStyle = {
    color: "#4a5568",
    maxWidth: "40rem",
    margin: "0 auto",
  };

  const contentGridStyle = {
    display: "grid",
    gap: "3rem",
    gridTemplateColumns: window.innerWidth >= 768 ? "1fr 1fr" : "1fr",
    alignItems: "center",
  };

  const imageContainerStyle = {
    position: "relative",
    height: "300px",
    borderRadius: "0.5rem",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const featuresGridStyle = {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: window.innerWidth >= 640 ? "1fr 1fr" : "1fr",
  };

  const featureCardStyle = {
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "#3182ce",
    marginBottom: "1rem",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={titleStyle}>About Water Metro</h2>
          <p style={descriptionStyle}>
            An integrated water transport system providing modern, safe, and comfortable travel experience across waterways.
          </p>
        </div>

        <div style={contentGridStyle}>
          <div style={imageContainerStyle}>
            <img
              src="https://cdn-dev.watermetro.co.in/boat0001_7dd6617bec.png"
              alt="Water Metro Boat"
              style={imageStyle}
            />
          </div>

          <div style={featuresGridStyle}>
            {features.map((feature) => (
              <div key={feature.title} style={featureCardStyle}>
                <feature.icon style={iconStyle} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
