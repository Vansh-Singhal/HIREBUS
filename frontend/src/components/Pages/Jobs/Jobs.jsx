import React, { useState } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import JobCard from "../../shared/JobCard";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import useGetAllJobs from "../../../hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { alljobs } = useSelector((state) => state.jobs);

  // Local state to store search term and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
  });

  // Function to handle search and filter changes
  const handleFilterChange = (newFilters) => {
    setSearchTerm(newFilters.searchTerm || searchTerm);
    setFilters(newFilters);
  };

  // Function to filter jobs based on the search and filters
  const filteredJobs = alljobs.filter((job) => {
    const isSearchMatch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company &&
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()));


    const isLocationMatch = filters.location
      ? job.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const isJobTypeMatch = filters.jobType
      ? job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
      : true;
    return isLocationMatch  && isJobTypeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SearchBar onFilterChange={handleFilterChange} />
        <h1 className="text-3xl font-bold text-[#433a3f] mb-8">
          Available Jobs
        </h1>
        <div className="space-y-6">
          {filteredJobs.length <= 0 ? (
            <span className="text-md text-gray-400">Jobs not found...</span>
          ) : (
            filteredJobs.map((item) => {
              return <JobCard key={item._id} job={item} />;
            })
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
