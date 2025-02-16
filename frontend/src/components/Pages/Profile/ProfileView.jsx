import React from "react"
import { useSelector } from "react-redux";
import Navbar from "../../shared/Navbar.jsx";
import Footer from "../../shared/Footer.jsx";
import UserCard from "./UserCard.jsx";
import useGetAllAppliedApplications from '../../../hooks/useGetAllAppliedApplications.jsx';
import AppliedJobsTable from './AppliedJobsTable.jsx';

const ProfileView = () => {
    useGetAllAppliedApplications();
    const { user } = useSelector((state) => state.auth);
    // let appliedJobs = [
    //     {
    //         title: "Manager",
    //         company: "google",
    //         appliedDate: "12-Jan-2005",
    //         status: "Pending"
    //     },
    // ];

    let { applications } = useSelector(state => state.application);


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#cbef43] via-[#8de969]">
            <Navbar />
            <UserCard user={user} />
            {user?.role === "student" && <AppliedJobsTable appliedJobs={applications}/>}
            <Footer />
        </div>
    )
}

export default ProfileView;

