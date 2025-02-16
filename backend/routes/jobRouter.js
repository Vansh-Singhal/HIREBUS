import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { deleteJob, getAllJobs, getJobById, getJobsByAdmin, postJob } from "../controllers/job.js";
const jobRouter = express.Router();

jobRouter.post("/post",isLoggedIn, postJob);
jobRouter.get("/get", getAllJobs);
jobRouter.get("/get/:id", getJobById);
jobRouter.get("/admin/get",isLoggedIn, getJobsByAdmin);
jobRouter.delete("/admin/delete/:id",isLoggedIn, deleteJob);


export default jobRouter;