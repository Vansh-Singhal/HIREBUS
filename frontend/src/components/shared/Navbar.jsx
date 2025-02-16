import React, { useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { setUser } from '../../redux/authSlice';
import { setAllCompanies } from '../../redux/companySlice';


const Avatar = ({ user }) => {


  return (
    (user?.profile.profilepic) ?
      <img src={user?.profile.profilepic} className="size-9 rounded-full" alt="">
      </img>
      :
      <div className="size-9 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold">
        {user ? user.fullname[0] : ""}
      </div>

  )
}

const Menu = ({ user }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let logoutHandler = async () => {
    try {
      dispatch(setUser(null));
      dispatch(setAllCompanies([]));
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    }
    catch (err) {
      console.log(err.message);
      toast.error("Could not log out. Try Again!");
    }
  }

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <div className="p-2 flex items-center gap-4">
        <Avatar user={user} />
        <div className="flex flex-col justify-center text-left">
          <h3 className="text-base font-bold text-gray-800 max-w-[123px] truncate">
            {
              user?.fullname ? user?.fullname : ""
            }
          </h3>
          <p className="text-sm font-semibold text-gray-600 max-w-[123px] truncate">
            {String(user?.role).charAt(0).toUpperCase() + String(user?.role).slice(1)}
          </p>
        </div>
      </div>
      <hr />
      <Link
        to="/profile"
        className="flex items-center gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <CgProfile size={20} />
        Update Profile
      </Link>
      <button
        onClick={logoutHandler}
        className="flex items-center gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
      >
        <IoIosLogOut size={20} />
        Logout
      </button>
    </div>
  );
};

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="h-[76px] bg-[#433a3f] flex items-center justify-between shadow-md">
      <div className="container mx-auto flex items-center justify-between max-w-7xl">
        <div className='logo'>
          <Link to="/" className="text-white text-2xl font-bold">
            HIRE<span className='text-red-400'>BUS</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
            Home
          </Link>
          {
            (user && user.role) === "recruiter" ? (
              <>
                <Link to="/admin/company" className="text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
                  Company
                </Link>
                <Link to="/admin/jobs" className="text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
                  Jobs
                </Link>
              </>
            ) : (
              <Link to="/jobs" className="text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
                Jobs
              </Link>
            )
          }
          <Link to="/about" className="text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
            About
          </Link>

          {
            !user ? (
              <div className='space-x-1'>
                <Link to="/login"><button className="bg-[#3d5a6c] text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
                  Login
                </button></Link>
                <Link to="/signup"><button className="bg-[#72a98f] text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
                  Signup
                </button></Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded"
                >
                  <Avatar user={user} />
                </button>
                {isDropdownOpen && <Menu user={user} />}
              </div>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

