import React, { useEffect, useState } from "react"
import Navbar from "../../shared/Navbar"
import Footer from "../../shared/Footer"
import JobCard from "./JobCard"
import JobDetails from "./JobDetails"
import ApplicationStatus from "./ApplicationStatus"
import { FaUsers } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { setSingleJob } from "../../../redux/jobSlice"
import axios from "axios"
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../../../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

const JobDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { singleJob } = useSelector(state => state.jobs);
  const jobId = params.id;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch, user?._id]);

  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (singleJob && user) {
      setIsApplied(singleJob?.application?.some(application => application?.applicant === user?._id) || false);
    }
  }, [singleJob, user]);

  const handleApply = async () => {
    if (!user || (user?.role === "recruiter")) {
      toast.warning("You must be logged in as Student");
      navigate("/login");
    }
    else {
      try {
        let res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
        if (res.data.success === true) {
          toast.success(res.data.message);
          setIsApplied(true);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.response.data.message);
      }
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real application, this would send an API request to bookmark/unbookmark the job
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {singleJob && (
              <JobCard
                job={singleJob}
                onApply={handleApply}
                onBookmark={handleBookmark}
                isApplied={isApplied}
                isBookmarked={isBookmarked}
              />
            )}
            {singleJob && <JobDetails job={singleJob} />}
          </div>
          <div className="md:col-span-1">
            <ApplicationStatus isApplied={isApplied} />
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h3 className="text-xl font-semibold text-[#433a3f] mb-4">Applicants</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUsers className="text-[#3d5a6c] mr-2" size={24} />
                  <span className="text-2xl font-bold text-[#3d5a6c]">
                    {singleJob ? singleJob?.position : 0}
                  </span>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">
                    {singleJob ? singleJob?.position - singleJob?.application?.filter((item) => {
                      return (item?.status === "accepted")
                    }).length : 0}
                  </span>{" "}
                  spots left
                </div>
              </div>


              {/* Progress Bar */}
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#72a98f] h-2 rounded-full"
                  style={{
                    width: `${singleJob && singleJob?.application
                      ? ((singleJob?.application?.filter((item) => item?.status === "accepted").length) / singleJob?.position) * 100
                      : 0
                      }%`,
                  }}
                ></div>
              </div>



            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDescription;