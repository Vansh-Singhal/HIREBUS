import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminJobCard from "./AdminJobCard.jsx"; // Import the AdminJobCard component

const JobPage = () => {
    const [search, setSearch] = useState("");
    const { adminjobs } = useSelector(state => state.jobs);

    // Filter jobs based on search input
    const filteredJobs = adminjobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#cbef43] via-[#8de969] p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Filter by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-3 border rounded-lg w-full sm:w-1/3 outline-none focus:border-gray-500"
                    />
                    <Link 
                        to="/admin/job/create" 
                        className="bg-[#433a3f] text-white p-3 rounded flex items-center hover:bg-[#2f292d] transition"
                    >
                        <FaPlus className="mr-2" /> New Job
                    </Link>
                </div>

                {/* Show message if no jobs exist */}
                {adminjobs.length === 0 ? (
                    <p className="text-center text-gray-500 mt-6">No Jobs added yet...</p>
                ) : (
                    <div className="space-y-4">
                        {filteredJobs.map((job, index) => (
                            <div key={index} className="w-full">
                                <AdminJobCard job={job} />
                            </div>
                        ))}
                    </div>
                )}

                {adminjobs.length > 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        A list of your recently added jobs
                    </p>
                )}
            </div>
        </div>
    );
};

export default JobPage;
