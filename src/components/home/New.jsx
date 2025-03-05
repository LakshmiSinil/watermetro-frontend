import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./news.css"; // Import the CSS file

const newsItems = [
  {
    id: 1,
    title: "New Terminal Opening",
    date: "2024-03-06",
    image: "https://english.mathrubhumi.com/image/contentid/policy:1.7837327:1662353300/kochi_metro_rail.jpg?$p=80e9948&f=16x10&w=852&q=0.8",
    description: "New terminal:PM Modi to inaugurate last station of Kochi Metro's phase 1 on March 6 .",
  },
  {
    id: 2,
    title: "Extended Service Hours",
    date: "2024-01-28",
    image: "/placeholder.svg?height=200&width=400",
    description: "Water Metro extends service hours during festival season",
  },
  {
    id: 3,
    title: "Passenger Milestone",
    date: "2024-01-25",
    image: "/placeholder.svg?height=200&width=400",
    description: "Water Metro crosses 3.5 million passenger mark",
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
    <section className="news-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">News & Updates</h2>
          <p className="section-description">Stay updated with the latest news and announcements</p>
        </div>

        <div className="slider-container">
          <div className="slider">
            <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {newsItems.map((item) => (
                <div key={item.id} className="slider-item">
                  <div className="card">
                    <div className="card-header">
                      <img src={item.image} alt={item.title} className="card-image" />
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-date">{item.date}</p>
                      <p className="card-description">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="slider-button left" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="slider-button right" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
