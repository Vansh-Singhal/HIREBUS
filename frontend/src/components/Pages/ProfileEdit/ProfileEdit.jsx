import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Navbar from "../../shared/Navbar"
import Footer from "../../shared/Footer"
import ProfileHeader from "./ProfileHeader"
import PersonalInfo from "./PersonalInfo"
import ProfessionalInfo from "./ProfessionalInfo"
import { toast } from "react-toastify"
import axios from "axios"
import { USER_API_ENDPOINT } from "../../../utils/constant"
import { setUser } from "../../../redux/authSlice"
import { useNavigate } from "react-router-dom"

const ProfileEdit = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact || "",
        role: user?.role || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills || [],
        resume: user?.profile?.resume || "",
        profilepic: user?.profile?.profilepic || "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSkillsChange = (skills) => {
        setProfileData((prevData) => ({
            ...prevData,
            skills,
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setProfileData((prevData) => ({
            ...prevData,
            [e.target.name]: file,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData();
        Object.keys(profileData).forEach((key) => {
            if (key === "skills") {
                formData.append(key, profileData[key].join(","))
            } else {
                formData.append(key, profileData[key])
            }
        })

        try {
            const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success("Profile updated successfully")
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating profile")
        } finally {
            setLoading(false);
            navigate("/profile")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <form onSubmit={handleSubmit}>
                    <ProfileHeader profileData={profileData} handleFileChange={handleFileChange} />
                    <div className="mt-8 grid gap-8 md:grid-cols-2">
                        <PersonalInfo profileData={profileData} handleInputChange={handleInputChange} />
                        <ProfessionalInfo
                            profileData={profileData}
                            handleInputChange={handleInputChange}
                            handleSkillsChange={handleSkillsChange}
                            handleFileChange={handleFileChange}
                        />
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#72a98f] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#3d5a6c] transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default ProfileEdit

