import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaGraduationCap } from "react-icons/fa";
import { removeAdminJob } from "../../../../redux/jobSlice.jsx";
import { toast } from "react-toastify";
import { JOB_API_ENDPOINT } from "../../../../utils/constant.jsx";
import axios from 'axios';
import { useDispatch } from "react-redux";

const Avatar = ({ company }) => {
  return (
    <div className="size-12 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold">
      {company?.logo ? (
        <img src={company.logo} className="size-9 rounded-full" alt="Company Logo" />
      ) : (
        company?.name ? company.name[0] : "J"
      )}
    </div>
  );
};

const AdminJobCard = ({ job }) => {
  const dispatch = useDispatch();

  let onDelete = async (jobId) => {
    try {
      // Make the API call to delete the company from the backend
      let res = await axios.delete(`${JOB_API_ENDPOINT}/admin/delete/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(removeAdminJob(jobId));
        toast.success(res.data.message);
      }
    }
    catch (err) {
      console.log(err.response);
    }
  }

  const postedAgo = (() => {
    const createdDate = new Date(job.createdAt);
    const now = new Date();
    const diffInDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
    return diffInDays === 0 ? "Posted Today" : `${diffInDays} days ago`;
  })();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 border border-gray-200 relative w-full">
      {/* Card Header */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar company={job.company} />
        <div>
          <h3 className="text-xl font-semibold text-[#3d5a6c]">{job.title}</h3>
          <p className="text-gray-600">{job.company?.name || "Unknown Company"}</p>

        </div>
      </div>

      {/* Job description */}
      {job.description && <p className="text-gray-600 text-sm mb-4">{job.description}</p>}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
        <div className="flex items-center mr-4 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <FaClock className="mr-2" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <FaDollarSign className="mr-2" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaGraduationCap className="mr-2" />
          <span>
            {job.experience}
            {typeof job.experience === "number" ? " years" : ""}
          </span>
        </div>
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {job.requirements.map((label, index) => (
          <span
            key={index}
            className={`text-xs font-semibold px-2 py-1 rounded-full ${index % 3 === 0
              ? "bg-[#cbef43] text-[#433a3f]"
              : index % 3 === 1
                ? "bg-[#72a98f] text-white"
                : "bg-blue-500 text-white"
              }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{postedAgo}</p>
        <div className="space-x-2 flex">
          <Link to={`/admin/job/applications/${job._id}`} className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#3d5a6c] transition-colors">
            View Applications
          </Link>
          <button onClick={() => onDelete(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
            Delete Job
          </button>
        </div>
      </div>

      {/* Link to Job Details */}
      <div className="mt-4 text-center">
        <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline text-sm font-medium">
          View Job Details
        </Link>
      </div>
    </div>
  );
};

export default AdminJobCard;
