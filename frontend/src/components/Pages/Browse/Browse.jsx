import React, { useEffect } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "../../../hooks/useGetAllJobs";
import { setSearchedQuery } from "../../../redux/jobSlice";
import JobCard from "../../shared/JobCard";

const Browse = () => {
  useGetAllJobs();
  const {alljobs} = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-5xl m-auto">
          <h1 className="text-[#433a3f] font-bold text-2xl py-4">
            Searched Results ({alljobs.length})
          </h1>

          <div className="space-y-6">
            {alljobs.length <= 0 ? (
              <span className="text-md text-gray-400">Jobs not found...</span>
            ) : (
              alljobs.map((item) => {
                return <JobCard key={item._id} job={item} />;
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
