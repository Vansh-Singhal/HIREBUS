import React from "react"
import { FaCheckCircle, FaClock } from "react-icons/fa"

const ApplicationStatus = ({ isApplied }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-[#433a3f] mb-4">Application Status</h3>
      {isApplied ? (
        <div className="flex items-center text-green-600">
          <FaCheckCircle className="mr-2" size={24} />
          <span className="text-lg font-semibold">Application Submitted</span>
        </div>
      ) : (
        <div className="flex items-center text-yellow-600">
          <FaClock className="mr-2" size={24} />
          <span className="text-lg font-semibold">Not Applied</span>
        </div>
      )}
      {isApplied && (
        <div className="mt-4">
          <h4 className="font-semibold text-[#433a3f] mb-2">Next Steps:</h4>
          <ol className="list-decimal list-inside text-gray-700">
            <li>Review of your application (1-2 weeks)</li>
            <li>Potential phone screening</li>
            <li>Technical interview</li>
            <li>Final decision</li>
          </ol>
        </div>
      )}
    </div>
  )
}

export default ApplicationStatus

