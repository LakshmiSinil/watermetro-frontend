import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const newsItems = [
  {
    id: 1,
    title: "New Terminal Opening",
    date: "2024-03-06",
    image:
      "https://english.mathrubhumi.com/image/contentid/policy:1.7837327:1662353300/kochi_metro_rail.jpg?$p=80e9948&f=16x10&w=852&q=0.8",
    description:
      "New terminal: PM Modi to inaugurate the last station of Kochi Metro's phase 1 on March 6.",
  },
  {
    id: 2,
    title: "Extended Service Hours",
    date: "2024-01-28",
    image: "/placeholder.svg?height=200&width=400",
    description: "Water Metro extends service hours during festival season.",
  },
  {
    id: 3,
    title: "Passenger Milestone",
    date: "2024-01-25",
    image: "/placeholder.svg?height=200&width=400",
    description: "Water Metro crosses 3.5 million passenger mark.",
  },
];

export function NewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <section
      style={{
        padding: "5rem 0",
        background: "linear-gradient(to right, #007bff, #00c8ff)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
          News & Updates
        </h2>
        <p style={{ color: "#4a5568" }}>
          Stay updated with the latest news and announcements.
        </p>

        {/* Slider */}
        <div style={{ position: "relative", maxWidth: "1000px", margin: "2rem auto" }}>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                transition: "transform 0.3s ease-in-out",
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {newsItems.map((item) => (
                <div key={item.id} style={{ flexShrink: 0, width: "100%", padding: "0 1rem" }}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "0.5rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "relative", height: "12rem" }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "0.5rem" }}>
                        {item.date}
                      </p>
                      <p style={{ color: "#4a5568" }}>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: "-2rem",
              transform: "translateY(-50%)",
              background: "linear-gradient(to right, #007bff, #00c8ff)",
              border: "none",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <FaArrowLeft size={20} color="white" />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              top: "50%",
              right: "-2rem",
              transform: "translateY(-50%)",
              background: "linear-gradient(to right, #007bff, #00c8ff)",
              border: "none",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <FaArrowRight size={20} color="white" />
          </button>
        </div>
      </div>
    </section>
  );
}
