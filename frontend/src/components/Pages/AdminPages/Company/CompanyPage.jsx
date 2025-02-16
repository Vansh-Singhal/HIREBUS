import React from 'react'
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "../../../../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { removeCompany } from "../../../../redux/companySlice";


export default function CompanyPage() {

    const dispatch = useDispatch();

    let deleteCompany = async (company) => {
        try {
            // Make the API call to delete the company from the backend
            let res = await axios.delete(`${COMPANY_API_ENDPOINT}/delete/${company._id}`, { withCredentials: true });
            if (res.data.success) {            
                dispatch(removeCompany(company._id));
                toast.success(res.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };
    

    const { companies } = useSelector(state => state.company); // Ensure companies is always an array
    const [search, setSearch] = useState("");

    // Filter companies based on search input
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#cbef43] via-[#8de969] p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Filter by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border-2 border-gray-400 rounded-lg w-1/3 outline-none"
                    />
                    <Link to="/admin/company/create" className="bg-[#433a3f] text-white p-2 rounded flex items-center">
                        <FaPlus className="mr-2" /> New Company
                    </Link>
                </div>

                {/* Show message if no companies exist */}
                {companies.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No companies added yet...</p>
                ) : (
                    <table className="w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-[#72a98f] text-white">
                            <tr>
                                <th className="p-3 text-left">Logo</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Website</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((company, index) => (
                                <tr key={index} className="">
                                    <td className="p-3">
                                        <img src={company.logo} alt="Logo" className="m-2 size-8 rounded-full" />
                                    </td>
                                    <td className="p-3">{company.name}</td>
                                    <td className="p-3 text-blue-500 hover:text-blue-700 hover:cursor-pointer"><a href={company.website}>{company.website}</a></td>
                                    <td className="p-3">{company.description}</td>
                                    <td className="p-3">{company.updatedAt ? new Date(company.updatedAt).toLocaleDateString() : "N/A"}</td>
                                    <td>
                                        <button className="w-full p-auto" onClick={() => deleteCompany(company)}><MdDelete className="w-full h-6 text-gray-500 hover:text-gray-700 hover:cursor-pointer" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {companies.length > 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        A list of your recent registered companies
                    </p>
                )}
            </div>
        </div>
    );
}
