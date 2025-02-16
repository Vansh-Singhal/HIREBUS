import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const applicationRouter = express.Router();

applicationRouter.get("/apply/:id",isLoggedIn,applyJob);
applicationRouter.get("/get",isLoggedIn,getAppliedJobs);
applicationRouter.get("/applicants/get/:id",isLoggedIn,getApplicants);
applicationRouter.put("/updatestatus/:id",isLoggedIn,updateStatus);

export default applicationRouter;