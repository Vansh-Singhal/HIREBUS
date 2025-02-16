import React from "react"
import Navbar from "../../shared/Navbar.jsx"
import Footer from "../../shared/Footer.jsx"
import HeroSection from "./HeroSection.jsx"
import FeatureSection from "./FeatureSection.jsx"
import BenefitsSection from "./BenefitsSection.jsx"
import StorySection from "./StorySection.jsx"

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <BenefitsSection />
      <StorySection />
      <Footer />
    </div>
  )
}

export default About

