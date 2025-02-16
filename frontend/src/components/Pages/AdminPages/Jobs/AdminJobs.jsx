import React from 'react';
import Navbar from '../../../shared/Navbar.jsx';
import Footer from '../../../shared/Footer.jsx';
import JobPage from './JobPage.jsx';
import useGetAllAdminJobs from '../../../../hooks/useGetAllAdminJobs.jsx';
import useGetAllCompanies from '../../../../hooks/useGetAllCompanies.jsx';

const AdminJobs = () => {
  useGetAllAdminJobs();
  useGetAllCompanies();
  return (
    <div>
      <Navbar />
      <JobPage />
      <Footer />
    </div>
  )
}

export default AdminJobs