import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LuLoaderCircle } from 'react-icons/lu';
import { FaTimes } from 'react-icons/fa';

import { JOB_API_ENDPOINT } from '../../../../utils/constant';
import { setLoading } from '../../../../redux/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreatePage() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);
  const { companies } = useSelector(state => state.company);

  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: [],
    salary: '',
    location: '',
    jobType: 'Full-time', // Default value
    experience: '',
    position: '',
    company: ''
  });

  const [requirement, setRequirement] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  const handleInputChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleRequirementAdd = (e) => {
    e.preventDefault();
    if (requirement.trim()) {
      setJobData({
        ...jobData,
        requirements: [...jobData.requirements, requirement.trim()]
      });
      setRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setJobData({
      ...jobData,
      requirements: jobData.requirements.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();

    const jobPayload = { ...jobData, requirements: jobData.requirements.join(",") };

    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, jobPayload, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        Navigate("/admin/jobs");
        toast.success(res.data.message);
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cbef43] via-[#8de969] p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-[#433a3f] mb-2">Create New Job</h1>
          <p className="text-gray-500 text-sm mb-8">
            Fill in the details for the new job position
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[#433a3f] mb-2">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={jobData.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#433a3f] mb-2">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={jobData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f] resize-none"
                placeholder="Enter detailed job description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#433a3f] mb-2">
                Requirements
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                  placeholder="Add a requirement"
                />
                <button
                  onClick={handleRequirementAdd}
                  type="button"
                  className="px-4 py-2 bg-[#72a98f] text-white rounded-lg hover:bg-opacity-90"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm">{req}</span>
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-[#433a3f] mb-2">
                  Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[#433a3f] mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={jobData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                  placeholder="e.g., New York, NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-[#433a3f] mb-2">
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={jobData.jobType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-[#433a3f] mb-2">
                  Experience Required
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={jobData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                  placeholder="e.g., 3-5 years"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-[#433a3f] mb-2">
                  Number of Positions
                </label>
                <input
                  type="Number"
                  id="position"
                  name="position"
                  value={jobData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                  placeholder="e.g., 12"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#433a3f] mb-2">
                  Company
                </label>
                <select
                  id="company"
                  name="company"
                  value={jobData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                >
                  <option value="">Select Company</option>
                  {companies?.map(company => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link
                to="/admin/jobs"
                className="px-4 py-2 text-[#433a3f] hover:text-opacity-70 transition-colors duration-200"
              >
                Cancel
              </Link>

              {loading ? (
                <button
                  type="button"
                  className="px-6 py-2 bg-[#433a3f] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 flex gap-2 items-center"
                  disabled
                >
                  <LuLoaderCircle className="animate-spin" /> <span>Creating...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#433a3f] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200"
                >
                  Create Job
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}