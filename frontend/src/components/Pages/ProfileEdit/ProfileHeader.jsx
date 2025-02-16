import React from "react"
import { FaCamera } from "react-icons/fa"

const ProfileHeader = ({ profileData, handleFileChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img
                        src={profileData.profilepic || "/placeholder.svg?height=128&width=128"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border text-center"
                    />
                    <label
                        htmlFor="profilepic"
                        className="absolute bottom-0 right-0 bg-[#72a98f] text-white p-2 rounded-full cursor-pointer hover:bg-[#3d5a6c] transition duration-300"
                    >
                        <FaCamera />
                        <input
                            type="file"
                            id="profilepic"
                            name="profilepic"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <h1 className="mt-4 text-2xl font-bold text-[#433a3f]">{profileData.fullname}</h1>
                <p className="text-gray-600">{String(profileData.role).charAt(0).toUpperCase() + String(profileData.role).slice(1)}</p>
            </div>
        </div>
    )
}

export default ProfileHeader

