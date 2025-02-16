import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const SearchBar = ({ onFilterChange }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [name]: value };
      onFilterChange({ ...newFilters, searchTerm });
      return newFilters;
    });
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for jobs, companies, or keywords..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-3 px-4 pr-12 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-[#72a98f] bg-white text-[#433a3f] shadow-md"
        />
        <FaSearch className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <button
          onClick={toggleFilters}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3d5a6c] hover:text-[#72a98f] transition-colors"
          aria-label="Toggle filters"
        >
          <FaFilter size={20} />
        </button>
      </div>
      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#72a98f] focus:border-[#72a98f]"
                placeholder="e.g., New York"
              />
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                JOB TYPE
              </label>
              <input
                type="text"
                id="jobType"
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#72a98f] focus:border-[#72a98f]"
                placeholder="e.g., Full-time"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
