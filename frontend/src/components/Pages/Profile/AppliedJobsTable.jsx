import React from "react"
import { FaSpinner } from "react-icons/fa"

const AppliedJobsTable = ({ appliedJobs, loading }) => {
  
  if (loading) {
    return (
      <div className="my-4 py-8 px-4 bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
        <FaSpinner className="animate-spin text-[#3d5a6c] text-4xl" />
      </div>
    )
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="my-4 py-8 px-4 bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-600">You haven't applied to any jobs yet.</p>
      </div>
    )
  }

  return (
    <div className="my-8 mx-auto bg-white rounded-lg shadow-md overflow-hidden max-w-5xl">
      <h2 className="text-xl font-semibold text-[#433a3f] p-6 border-b">Applied Jobs</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appliedJobs.map((application, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{application?.job?.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{application.job.company?.name || "Unknown Company"}</div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(application.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}
                  >
                    {String(application.status).charAt(0).toUpperCase() + String(application.status).slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const getStatusColor = (status) => {
  switch (String(status).charAt(0).toUpperCase() + String(status).slice(1)) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "Accepted":
      return "bg-green-100 text-green-800"
    case "Rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default AppliedJobsTable

