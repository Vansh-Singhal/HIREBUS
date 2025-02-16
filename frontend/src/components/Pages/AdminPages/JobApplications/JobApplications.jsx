import React from 'react';
import Navbar from '../../../shared/Navbar.jsx';
import Footer from '../../../shared/Footer.jsx';
import ApplicationTable from './ApplicationTable.jsx';
import useGetAllApplications from '../../../../hooks/useGetAllApplications.jsx';

const JobApplications = () => {
  
  useGetAllApplications();

  return (
    <div>
        <Navbar />
        <ApplicationTable />
        <Footer />
    </div>
  )
}

export default JobApplications