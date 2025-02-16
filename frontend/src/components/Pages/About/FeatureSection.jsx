import React from "react";
import { FaUsers, FaBriefcase, FaHandshake } from "react-icons/fa";

// FeatureCard component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-center">
      <Icon size={48} className="text-[#72a98f] mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-[#433a3f] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// FeatureSection component
const FeatureSection = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <FeatureCard
          icon={FaUsers}
          title="For Job Seekers"
          description="Discover a wide range of job opportunities tailored to your skills and aspirations. Build your professional profile and connect with top employers."
        />
        <FeatureCard
          icon={FaBriefcase}
          title="For Employers"
          description="Find the perfect candidates for your open positions. Post job listings, review applications, and streamline your hiring process with our intuitive tools."
        />
        <FeatureCard
          icon={FaHandshake}
          title="Our Mission"
          description="To bridge the gap between talent and opportunity, fostering career growth and helping businesses thrive with the right team members."
        />
      </div>
    </div>
  );
};

export default FeatureSection;
