import React from "react";
import { FaBriefcase, FaFileAlt } from "react-icons/fa";

const ProfessionalInfo = ({ profileData, handleInputChange, handleSkillsChange, handleFileChange }) => {
    const handleSkillInput = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            const newSkill = e.target.value.trim();
            handleSkillsChange([...profileData.skills, newSkill]);
            e.target.value = "";
        }
    };

    const removeSkill = (skillToRemove) => {
        handleSkillsChange(profileData.skills.filter((skill) => skill !== skillToRemove));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#433a3f] mb-4">Professional Information</h2>
            <div className="space-y-4 overflow-hidden">
                {/* Bio Section */}
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio || ""} // Ensure fallback for undefined value
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 rounded-lg resize-none border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                    ></textarea>
                </div>

                {/* Skills Section */}
                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                        Skills
                    </label>
                    <div className="relative">
                        <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            placeholder="Enter your skills (Press Enter)"
                            onKeyDown={handleSkillInput}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                        />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {profileData.skills &&
                            profileData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-[#72a98f] text-white px-2 py-1 rounded-full text-sm flex items-center"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 text-white hover:text-red-500 focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                    </div>
                </div>

                {/* Resume Section */}
                <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                        Resume
                    </label>
                    <div className="relative">
                        <FaFileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                        />
                    </div>
                    {profileData.resume && (
                        <p className="mt-2 text-sm text-gray-600">
                            Current resume: {profileData.resume.name || profileData.resume}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfessionalInfo;
