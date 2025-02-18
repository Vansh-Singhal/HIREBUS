import Navbar from '../shared/Navbar';
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { LuLoaderCircle } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';

export default function Signup() {

  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    role: "",
    file: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("contact", input.contact);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file)
    }


    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        Navigate("/login");
        toast.success(res.data.message + " Please Login.");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#cbef43] via-[#8de969]'>
      <Navbar />
      <div>
        <SignupForm input={input} changeEventHandler={changeEventHandler} changeFileHandler={changeFileHandler} submitHandler={submitHandler} loading={loading} />
      </div>
    </div>
  )
}

const SignupForm = ({ input, changeEventHandler, changeFileHandler, submitHandler, loading }) => {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white/60 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Create your account
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">

          {/* FULLNAME Field */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Contact Field */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="contact"
                name="contact"
                value={input.contact}
                onChange={changeEventHandler}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#3d5a6c] focus:ring-1 focus:ring-[#3d5a6c] outline-none"
                placeholder="1234567890"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I am a
            </label>
            <div className="grid grid-cols-2 text-center gap-2">
              <label>
                <input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="hidden peer" />
                <div className="py-2 px-4 rounded-lg border transition-colors peer-checked:bg-[#3d5a6c] peer-checked:text-white peer-checked:border-[#3d5a6c] bg-white text-gray-700 border-gray-300 hover:border-[#3d5a6c]">
                  Student
                </div>
              </label>

              <label>
                <input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} className="hidden peer" />
                <div className="py-2 px-4 rounded-lg border transition-colors peer-checked:bg-[#3d5a6c] peer-checked:text-white peer-checked:border-[#3d5a6c] bg-white text-gray-700 border-gray-300 hover:border-[#3d5a6c]">
                  Recruiter
                </div>
              </label>
            </div>

          </div>

          {/* Profile Picture Section */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <div className="relative">
              <input
                accept="image/*"
                id="file"
                name="file"
                type="file"
                onChange={changeFileHandler}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 rounded-lg outline outline-[#72a98f] py-1"
              />
              <span id="file-name" className="text-gray-700"></span>
            </div>

          </div>

          {/* Submit Field */}

          {
            loading ? <button className="text-center w-full bg-[#72a98f] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#72a98f]/20 transition-shadow flex items-center justify-center gap-2">
              <LuLoaderCircle className='animate-spin' /> <span>Creating User...</span>
            </button> : <button
              type="submit"
              className="text-center w-full bg-[#72a98f] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#72a98f]/20 transition-shadow"
            >
              Create Account
            </button>
          }



        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="text-[#3d5a6c] hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
