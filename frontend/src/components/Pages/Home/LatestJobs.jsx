import React from "react";
import JobCard from "../../shared/JobCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
    const { alljobs } = useSelector((state) => state.jobs);
    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-bold text-[#433a3f] mb-8 text-center">Latest Job Openings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        alljobs.length <= 0 ?
                            <span className="text-md text-gray-400">Jobs not found...</span>
                            :
                            alljobs.slice(0, 6).map((item, idx) => {
                                return <JobCard key={item._id} job={item} />
                            })
                    }
                </div>
                <div className="text-center mt-12">
                    <a
                        href="/jobs"
                        className="inline-block bg-[#72a98f] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#3d5a6c] transition duration-300"
                    >
                        View All Jobs
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LatestJobs;

