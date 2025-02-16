import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    Navigate("/browse");
  }

  const searchHandler = (val) => {
    dispatch(setSearchedQuery(val));
    Navigate("/browse");
  }

  const searchSuggestions = [
    "Software Engineering",
    "Web Developer",
    "Data Science",
    "Marketing",
    "Design",
    "FullStack Developer",
    "AI Developer",
    "Chattered Accountant",
    "Content Designer",
    "UI/UX Designer",
    "Fashion Designer",
  ];

  return (
    <div className="heroSection py-20 bg-gradient-to-br from-[#cbef43] to-[#79b986] relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-1">
        {/* Text Content */}
        <h1 className="text-5xl font-bold text-[#4b6e75] mb-6 text-center relative">
          Jumpstart Your Career with{" "}
          <span className="text-gray-800">HIREBUS</span>
        </h1>
        <p className="text-xl text-gray-800 mb-12 text-center max-w-3xl mx-auto relative">
          Connect with top employers, discover exciting opportunities, and take
          the first step towards your dream job.
        </p>

        {/* Search Input */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              onChange={(e) => {setQuery(e.target.value)}}
              type="text"
              placeholder="Search for jobs, companies, or skills..."
              className="w-full py-4 px-6 rounded-full border-2 border-gray-600 focus:outline-none focus:border-gray-900 text-gray-700 text-lg shadow-sm"
            />
            <button onClick={searchJobHandler} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
              <FaSearch size={20} />
            </button>
          </div>
        </div>

        {/* Buttons Carousel*/}
        <ul className="my-4 flex flex-wrap items-center justify-center relative">
          {searchSuggestions.map((btn, i) => (
            <li
              key={i}
              onClick = {() => searchHandler(btn)}
              className="bg-white cursor-pointer text-gray-700 my-2 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition duration-300 mx-2 whitespace-nowrap"
            >
              {btn}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;
