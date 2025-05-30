"use client";
import React from "react";


import { Footer } from "@/components/Footer/Footer";
import { TechShowcaseSection } from "./components/TechSection/TechSection";
import OpenSourceSection from "./components/OpenSourceSection/OpenSourceSection";
import { PhilosophySection } from "./components/PhilosophySection/PhilosophySection";


const Landing = () => {


  return (
    <>
     
      <OpenSourceSection />
      <TechShowcaseSection/>
      <PhilosophySection />
      <Footer />
      
    </>
  );
};

export default Landing
