import React from "react"
import { FaRocket, FaUsers, FaBriefcase } from "react-icons/fa"

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#cbef43] to-[#79b986] py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold text-[#4b6e75] mb-6">
              About <span className="text-gray-800">HIREBUS</span>
            </h1>
            <p className="text-xl text-gray-800 mb-8">
              Connecting talented individuals with exciting career opportunities and helping businesses find their
              perfect match.
            </p>
            <div className="flex space-x-4">
              <a
                href="#our-story"
                className="bg-[#3d5a6c] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#72a98f] transition duration-300"
              >
                Our Story
              </a>
              <a
                href="#why-choose-us"
                className="bg-white text-[#3d5a6c] py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
              >
                Why Choose Us
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={FaRocket} title="Fast-growing" value="500K+" subtitle="Job Listings" />
              <StatCard icon={FaUsers} title="Active Users" value="1M+" subtitle="And Counting" />
              <StatCard icon={FaBriefcase} title="Companies" value="50K+" subtitle="Hiring on Hirebus" />
              <StatCard icon={FaRocket} title="Success Rate" value="95%" subtitle="Job Placements" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg text-center transform hover:scale-105 transition duration-300">
      <Icon className="text-[#72a98f] text-4xl mx-auto mb-2" />
      <h3 className="text-lg font-semibold text-[#433a3f]">{title}</h3>
      <p className="text-2xl font-bold text-[#3d5a6c]">{value}</p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  )
}

export default HeroSection

