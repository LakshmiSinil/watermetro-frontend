import React from "react";
import Footer from "./Footer"; 
import HeroSection from "./home/Herosection";
import { AboutSection } from "./home/About";
import { NewsSection } from "./home/New";
import { RouteMap } from "./home/Routes";

function Home() {
 
    return (
    <div>
      <main>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <RouteMap />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
