import React from "react"
import { FaBuilding, FaMapMarkerAlt, FaClock, FaDollarSign, FaBookmark, FaShare } from "react-icons/fa"

const JobCard = ({ job, onApply, onBookmark, isApplied, isBookmarked }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#433a3f] mb-2">{job.title}</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <FaBuilding className="mr-2" />
            <span>{job.company && job.company.name ? job.company.name : "Unknown Company"}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FaClock className="mr-2" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaDollarSign className="mr-2" />
            <span>{job.salary}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button
            onClick={onBookmark}
            className={`mb-2 p-2 rounded-full ${
              isBookmarked ? "bg-[#72a98f] text-white" : "bg-gray-200 text-gray-600"
            } hover:bg-[#3d5a6c] hover:text-white transition-colors`}
          >
            <FaBookmark />
          </button>
          <button
            onClick={() => {
              navigator.share({
                title: job.title,
                text: `Check out this job: ${job.title} at ${job.company}`,
                url: window.location.href,
              })
            }}
            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-[#3d5a6c] hover:text-white transition-colors"
          >
            <FaShare />
          </button>
        </div>
      </div>
      <button
        onClick={onApply}
        disabled={isApplied}
        className={`w-full py-2 px-4 rounded-full font-semibold ${
          isApplied
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#72a98f] text-white hover:bg-[#3d5a6c] transition-colors"
        }`}
      >
        {isApplied ? "Applied" : "Apply Now"}
      </button>
    </div>
  )
}

export default JobCard

