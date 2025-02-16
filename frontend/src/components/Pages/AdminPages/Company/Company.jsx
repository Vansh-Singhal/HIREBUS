import React from 'react';
import Navbar from '../../../shared/Navbar.jsx';
import Footer from '../../../shared/Footer.jsx';
import CompanyPage from './CompanyPage.jsx';
import useGetAllCompanies from '../../../../hooks/useGetAllCompanies.jsx';

const Company = () => {
  
  useGetAllCompanies();

  return (
    <div>
      <Navbar/>
      <CompanyPage/>
      <Footer/>
    </div>
  )
}

export default Company;