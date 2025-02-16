import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { COMPANY_API_ENDPOINT } from '../../../../utils/constant';
import { setLoading } from '../../../../redux/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LuLoaderCircle } from 'react-icons/lu';

export default function CreatePage() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const [companyData, setCompanyData] = useState({
    companyName: '',
    website: '',
    description : '',
    location : '',
    logo: null
  });

  const handleInputChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value })
  };

  const handleFileChange = (e) => {
    setCompanyData({ ...companyData, logo: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyName", companyData.companyName);
    formData.append("website", companyData.website);
    formData.append("description", companyData.description);
    formData.append("location", companyData.location);

    if (companyData.logo) {
      formData.append("logo", companyData.logo)
    }

    try {
      const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        Navigate("/admin/company");
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
          <h1 className="text-2xl font-bold text-[#433a3f] mb-2">Your Company Name</h1>
          <p className="text-gray-500 text-sm mb-8">
            What would you like to give your company name?
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-[#433a3f] mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyData.companyName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-[#433a3f] mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={companyData.website}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#433a3f] mb-2">
                Description
              </label>
              <input
                id="description"
                name="description"
                value={companyData.description}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                placeholder="Enter the description..."
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#433a3f] mb-2">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={companyData.location}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#72a98f]"
                placeholder="New York, USA"
              />
            </div>

            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-[#433a3f]">Logo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-4 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FaUpload className="mx-auto h-12 w-12 text-[#72a98f]" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="logo" className="relative cursor-pointer bg-white rounded-md font-medium text-[#72a98f] hover:text-[#433a3f] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#72a98f]">
                      <span>Upload a file</span>
                      <input
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link
                to="/admin/company"
                className="px-4 py-2 text-[#433a3f] hover:text-opacity-70 transition-colors duration-200"
              >
                Cancel
              </Link>

              {loading ? 
                <button
                type="submit"
                className="px-6 py-2 bg-[#433a3f] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 flex gap-2 items-center"
              >
                <LuLoaderCircle className='animate-spin' /> <span>Registering...</span>
              </button>
                :
                <button
                type="submit"
                className="px-6 py-2 bg-[#433a3f] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200"
              >
                Continue
              </button>
              }

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}