import React from "react";
import Navbar from "../../shared/Navbar.jsx";
import HeroSection from "./HeroSection.jsx";
import HomeJobs from "./HomeJobs.jsx";
import LatestJobs from "./LatestJobs.jsx";
import Footer from "../../shared/Footer.jsx";
import useGetAllJobs from '../../../hooks/useGetAllJobs.jsx'

const Home = () => {
  useGetAllJobs();
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <HomeJobs/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home;

