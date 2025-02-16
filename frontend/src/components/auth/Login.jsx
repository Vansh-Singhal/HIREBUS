import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { LuLoaderCircle } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    }
    catch (err) {
      toast.error(err.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#cbef43] via-[#8de969]'>
      <Navbar />
      <div>
        <LoginForm props={{ input, changeEventHandler, submitHandler, loading }} />
      </div>
    </div>
  )
}

const LoginForm = ({ props }) => {
  const { input, changeEventHandler, submitHandler, loading } = props;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white/60 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Log In Your Account
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">

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

          {/* Submit Field */}

          {
            loading ?
              <button
                className='text-center w-full bg-[#72a98f] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#72a98f]/20 transition-shadow flex items-center justify-center gap-2'>
                <LuLoaderCircle className='animate-spin' /> <span>Logging...</span>
              </button> : <button
                type="submit"
                className="text-center w-full bg-[#72a98f] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#72a98f]/20 transition-shadow"
              >
                Log In
              </button>
          }


        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-[#3d5a6c] hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};