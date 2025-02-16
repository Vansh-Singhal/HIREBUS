import express from "express";
import { deleteCompany, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { companyLogo } from "../middlewares/multer.js";
let companyRouter = express.Router();

companyRouter.post("/register",isLoggedIn,companyLogo,registerCompany);
companyRouter.get("/get",isLoggedIn,getCompany);
companyRouter.get("/get/:id",isLoggedIn,getCompanyById);
companyRouter.put("/update/:id",isLoggedIn,updateCompany);
companyRouter.delete("/delete/:id",isLoggedIn,deleteCompany);

export default companyRouter;