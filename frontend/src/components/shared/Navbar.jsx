import { useState } from "react"
import { IoIosLogOut, IoMdMenu, IoMdClose } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_ENDPOINT } from "../../utils/constant"
import { toast } from "react-toastify"
import { setUser } from "../../redux/authSlice"
import { setAllCompanies } from "../../redux/companySlice"

const Avatar = ({ user }) => {
  return user?.profile.profilepic ? (
    <img src={user?.profile.profilepic || "/placeholder.svg"} className="size-9 rounded-full" alt="" />
  ) : (
    <div className="size-9 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl font-bold">
      {user ? user.fullname[0] : ""}
    </div>
  )
}

const Menu = ({ user, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      dispatch(setUser(null))
      dispatch(setAllCompanies([]))
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/")
      }
    } catch (err) {
      console.log(err.message)
      toast.error("Could not log out. Try Again!")
    }
    onClose()
  }

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <div className="p-2 flex items-center gap-4">
        <Avatar user={user} />
        <div className="flex flex-col justify-center text-left">
          <h3 className="text-base font-bold text-gray-800 max-w-[123px] truncate">
            {user?.fullname ? user?.fullname : ""}
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
        onClick={onClose}
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
  )
}

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const logoutHandler = async () => {
    try {
      dispatch(setUser(null))
      dispatch(setAllCompanies([]))
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/")
      }
    } catch (err) {
      console.log(err.message)
      toast.error("Could not log out. Try Again!")
    }
    setIsMobileMenuOpen(false)
  }

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      className="text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded block"
      onClick={onClick}
    >
      {children}
    </Link>
  )

  const NavLinks = ({ onClose }) => (
    <>
      <NavLink to="/" onClick={onClose}>
        Home
      </NavLink>
      {(user && user.role) === "recruiter" ? (
        <>
          <NavLink to="/admin/company" onClick={onClose}>
            Company
          </NavLink>
          <NavLink to="/admin/jobs" onClick={onClose}>
            Jobs
          </NavLink>
        </>
      ) : (
        <NavLink to="/jobs" onClick={onClose}>
          Jobs
        </NavLink>
      )}
      <NavLink to="/about" onClick={onClose}>
        About
      </NavLink>
    </>
  )

  return (
    <nav className="bg-[#433a3f] shadow-md">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-[76px]">
          <div className="logo">
            <Link to="/" className="text-white text-2xl font-bold">
              HIRE<span className="text-red-400">BUS</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks onClose={() => { }} />
            {!user ? (
              <div className="space-x-1">
                <Link to="/login">
                  <button className="bg-[#3d5a6c] text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-[#72a98f] text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white hover:shadow-lg hover:shadow-white/10 transition-shadow py-2 px-3 rounded"
                >
                  <Avatar user={user} />
                </button>
                {isDropdownOpen && <Menu user={user} onClose={() => setIsDropdownOpen(false)} />}
              </div>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger from Right) */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white p-2">
              {isMobileMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "max-h-screen" : "max-h-0"} overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Profile on top */}
          {user && (
            <div className="flex items-center gap-4 mb-4">
              <Avatar user={user} />
              <div className="text-white">
                <p className="font-bold">{user.fullname}</p>
                <p className="text-sm">{String(user?.role).charAt(0).toUpperCase() + String(user?.role).slice(1)}</p>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <NavLinks onClose={() => setIsMobileMenuOpen(false)} />

          {/* Profile and Logout Options */}
          {user && (
            <div className="space-y-2 mt-4">
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="bg-[#3d5a6c] text-white py-2 px-3 rounded w-full">
                  Update Profile
                </button>
              </Link>
              <button
                onClick={logoutHandler}
                className="bg-[#72a98f] text-white py-2 px-3 rounded w-full"
              >
                Logout
              </button>
            </div>
          )}

          {/* If not logged in, show login/signup options */}
          {!user && (
            <div className="space-y-2 mt-2">
              <Link to="/login" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="bg-[#3d5a6c] text-white py-2 px-3 rounded w-full">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="bg-[#72a98f] text-white py-2 px-3 rounded w-full">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
