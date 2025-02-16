import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../../../utils/constant";
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard";
import { updateApplicationStatus } from "../../../../redux/applicationSlice";

export default function ApplicationTable() {
    const { applications } = useSelector(state => state.application);
    const dispatch = useDispatch();

    // State to handle modal visibility and selected user
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            let payload = { status: newStatus };
            let res = await axios.put(
                `${APPLICATION_API_ENDPOINT}/updatestatus/${applicationId}`,
                payload,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                // Dispatch action to update the redux state automatically
                dispatch(updateApplicationStatus({ id: applicationId, status: newStatus }));
            }
        } catch (error) {
            console.error("Error updating application status:", error);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "accepted":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    // Function to open the modal and set the selected user
    const openModal = (applicant) => {
        setSelectedUser(applicant);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#cbef43] via-[#8de969] p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#433a3f]">Job Applications</h1>
                        <p className="text-gray-500 text-sm">Manage applications for this position</p>
                    </div>
                    <Link to="/admin/jobs" className="text-[#433a3f] hover:underline">
                        Back to Jobs
                    </Link>
                </div>

                {applications.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No applications received yet...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#72a98f] text-white">
                                <tr>
                                    <th className="px-6 py-3 text-center">Applicant</th>
                                    <th className="px-6 py-3 text-center">Applied Date</th>
                                    <th className="px-6 py-3 text-center">Resume</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                    <th className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {applications.map((application) => (

                                    <tr key={application._id} className="hover:bg-gray-50">
                                        
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="size-10 rounded-full bg-[#433a3f] text-white flex items-center justify-center mr-3">
                                                    {application.applicant.avatar ? (
                                                        <img
                                                            src={application.applicant.avatar || "/placeholder.svg"}
                                                            alt={application.applicant.name}
                                                            className="size-10 rounded-full"
                                                        />
                                                    ) : (
                                                        <FaUser />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {application.applicant.name}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        {application.applicant.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(application.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {application.applicant.profile?.resume ? (
                                                <Link className="text-blue-500 hover:text-blue-700" to={application.applicant.profile.resume}>
                                                    {application.applicant.profile.resumeOriginalName}
                                                </Link>
                                            ) : (
                                                "No resume uploaded"
                                            )}

                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                                                    application.status
                                                )}`}
                                            >
                                                {application.status.charAt(0).toUpperCase() +
                                                    application.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openModal(application.applicant)}
                                                    className="bg-[#72a98f] text-white px-3 py-1 rounded hover:bg-opacity-80 transition-colors text-sm"
                                                >
                                                    View Profile
                                                </button>
                                                {application.status === "pending" ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(application._id, "accepted")
                                                            }
                                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-sm flex items-center"
                                                        >
                                                            <FaCheck className="mr-1" /> Accept
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(application._id, "rejected")
                                                            }
                                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm flex items-center"
                                                        >
                                                            <FaTimes className="mr-1" /> Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(application._id, "pending")
                                                        }
                                                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal Component */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative">
                        <ProfileCard user={selectedUser} />
                        <button
                            className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
