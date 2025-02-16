import React from 'react';
import { FaBuilding, FaGraduationCap, FaBriefcase } from "react-icons/fa";

export default function HomeJobs() {

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <OpportunityCard
                    icon={FaBuilding}
                    title="Top Companies"
                    description="Discover roles at industry-leading organizations"
                />
                <OpportunityCard
                    icon={FaGraduationCap}
                    title="Internships"
                    description="Gain valuable experience with internship positions"
                />
                <OpportunityCard
                    icon={FaBriefcase}
                    title="Entry-Level Jobs"
                    description="Find the perfect position to start your career"
                />
            </div>
        </div>
    )
}


const OpportunityCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
            <Icon size={40} className="text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}