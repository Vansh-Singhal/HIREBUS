import React from "react"
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa"

const PersonalInfo = ({ profileData, handleInputChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#433a3f] mb-4">Personal Information</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={profileData.fullname}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number
                    </label>
                    <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            value={profileData.contact}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo

