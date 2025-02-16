import React from "react";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Home from "./components/Pages/Home/Home.jsx";
import Jobs from "./components/Pages/Jobs/Jobs.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/Pages/About/About.jsx";
import ProfileEdit from "./components/Pages/ProfileEdit/ProfileEdit.jsx";
import ProfileView from "./components/Pages/Profile/ProfileView.jsx";
import JobDescription from "./components/Pages/JobPage/JobDescription.jsx";
import AdminJobs from "./components/Pages/AdminPages/Jobs/AdminJobs.jsx";
import Company from "./components/Pages/AdminPages/Company/Company.jsx";
import CreateCompany from "./components/Pages/AdminPages/CreateCompany/CreateCompany.jsx";
import CreateJob from "./components/Pages/AdminPages/CreateJob/CreateJob.jsx";
import JobApplications from "./components/Pages/AdminPages/JobApplications/JobApplications.jsx";
import Browse from "./components/Pages/Browse/Browse.jsx";
import AdminRoutes from "./components/Pages/AdminPages/AdminRoutes.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/job/:id",
    element: <JobDescription />,
  },
  {
    path: "browse",
    element: <Browse />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <ProfileView />,
  },
  {
    path: "/profile/edit",
    element: <ProfileEdit />,
  },
  {
    path: "/admin/jobs",
    element: (
      <AdminRoutes>
        <AdminJobs />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin/company",
    element: (
      <AdminRoutes>
        <Company />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin/company/create",
    element: (
      <AdminRoutes>
        <CreateCompany />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin/job/create",
    element: (
      <AdminRoutes>
        <CreateJob />
      </AdminRoutes>
    ),
  },
  {
    path: "/admin/job/applications/:job",
    element: (
      <AdminRoutes>
        <JobApplications />
      </AdminRoutes>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
