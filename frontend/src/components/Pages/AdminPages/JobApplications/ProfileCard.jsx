import React from "react";
import { FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa"

const ProfileCard = ({ user }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md relative">
          {/* User Card Content */}
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <img
                src={user.profile.profilepic || "/placeholder.svg"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#72a98f]"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#433a3f] text-center mb-2">{user.fullname}</h2>
            <p className="text-gray-600 text-center mb-4 capitalize">{user.role}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaEnvelope className="text-[#3d5a6c] mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-[#3d5a6c] mr-2" />
                <span>{String(user.contact)}</span>
              </div>
              {user.role === "recruiter" && user.company && (
                <div className="flex items-center">
                  <FaBriefcase className="text-[#3d5a6c] mr-2" />
                  <span>{user.company}</span>
                </div>
              )}
            </div>
          </div>
    
          <div className="bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-[#433a3f] mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((skill, index) => (
                <span key={index} className="bg-[#72a98f] text-white px-2 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-[#433a3f] mb-2">Bio</h3>
            <p className="text-gray-700">{user.profile.bio || "No bio available."}</p>
          </div>
          <div className="bg-gray-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-[#433a3f] mb-2">Resume</h3>
            <a href={user.profile.resume} className="text-blue-500 hover:text-blue-700">{user.profile.resumeOriginalName || "No resume available."}</a>
          </div>
        </div>
      );
}

export default ProfileCard

