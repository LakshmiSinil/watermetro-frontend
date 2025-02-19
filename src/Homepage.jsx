import React from 'react';
import Footer from './footer'; // Adjust the path as necessary
import HeroSection from './home/herosection';
import Navbar from './navbar';
import { AboutSection } from './home/about';
import { NewsSection } from './home/new';
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
