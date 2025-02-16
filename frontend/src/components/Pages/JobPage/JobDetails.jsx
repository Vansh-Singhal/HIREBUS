import React from "react"

const JobDetails = ({ job }) => {
  if (!job) {
    return null; // Prevents rendering if job data is not available
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-[#433a3f] mb-4">Job Description</h2>
      <p className="text-gray-700 mb-6">{job.description}</p>

      <h3 className="text-lg font-semibold text-[#433a3f] mb-2">Requirements</h3>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        {job.requirements && job.requirements.length > 0 ? (
          job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))
        ) : (
          <li>No requirements listed</li>
        )}
      </ul>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Posted on: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}</span>
      </div>
    </div>
  );
};

export default JobDetails;
