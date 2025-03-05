import React from 'react';
import Footer from './Footer'; // Adjust the path as necessary
import HeroSection from './home/Herosection';
import Navbar from './Navbar';
import { AboutSection } from './home/About';
import { NewsSection } from './home/New';
import { RouteMap } from './home/Routes';
function Home() {
  return (
    <div>
      <Navbar/>
      <main>
      <HeroSection/>
      <AboutSection/>
      <NewsSection/>
      <RouteMap/>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
