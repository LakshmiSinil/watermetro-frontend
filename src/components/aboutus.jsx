import React from 'react';
import './aboutus.css';
import Footer from './Footer';
import Navbar from './Navbar';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <header className="about-header">
          <div className="overlay">
            <h1>About Us</h1>
            <p>Enjoy the pioneering initiative in sustainable urban water transport.</p>
          </div>
        </header>

        {/* Main Content with Text and Image */}
        <section className="about-content">
          <div className="text-content">
            <p>
              Kochi, often referred to as the commercial capital of Kerala, is one of the most
              densely populated districts in the state of Kerala. The project is expected to
              reduce pollution and traffic congestion in the city and also ease access to
              business areas on the mainland for urban households situated along the Kochi lakeshore.
            </p>
            <p>
              The Kochi water metro project envisages the development of 15 identified routes,
              connecting 10 islands along a network of routes that span 78 km with a fleet of
              78 fast, electrically propelled hybrid ferries plying to 38 terminals.
            </p>
            <p>
              More than 33,000 islanders are expected to benefit from the water metro. It is
              envisaged to be a socially inclusive transport system that focuses on improved
              livelihoods through commercial property development and tourism-based initiatives.
            </p>
          </div>
          <div className="image-container">
            <img src={"https://cdn-dev.watermetro.co.in/boat0001_7dd6617bec.png"} alt="Kochi Water Metro" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


