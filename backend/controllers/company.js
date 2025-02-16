import debug from "debug";
import { applicationdb } from "../models/application.js";
import { companydb } from "../models/company.js";
import { jobdb } from "../models/job.js";
import getUri from "../utils/dataUri.js";
import { uploadFile } from "../utils/cloudinary.js";
const dbgr = debug("development:companyController");

export const registerCompany = async (req,res) => {
    try{
        const {companyName, website, description, location} = req.body;
        let file = req.file;
        
        let fileUri = getUri(file);
        let cloudRes = await uploadFile(fileUri);

        if (!companyName || !website || !description || !location || !file){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let company = await companydb.findOne({name : companyName});

        if (company){
            return res.status(400).json({
                message : "You cannot register same company twice",
                success : false
            });
        }

        company = await companydb.create({
            name : companyName,
            website,
            logo : cloudRes.secure_url,
            description,
            userId : req.id
        });

        return res.status(201).json({
            message : "Company registered Successfully",
            company,
            success : true
        });
    }
    catch(err){
        dbgr(err.message);
    }
}

export const getCompany = async (req,res) => {
    try {
        const userId = req.id;
        const companies = await companydb.find({userId});

        if (!companies){
            return res.status(404).json({
                message : "Companies not found",
                success : false
            })
        }

        return res.status(200).json({
            message : "Companies Fetched",
            companies,
            success : true
        })
    } 
    catch (err) {
        dbgr(err.message)
    }
}

export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await companydb.findOne({_id : companyId});

        if (!company){
            return res.status(404).json({
                message : "Company not found",
                success : false
            })
        }

        return res.status(200).json({
            message : "Company fetched successfully",
            company,
            success : true
        });
    } 
    catch (err) {
        dbgr(err.message)
    }
}

export const updateCompany = async (req,res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        let company = await companydb.findOne({_id: req.params.id});
        if (!company){
            return res.status(404).json({
                message : "Company not found",
                success : false
            });
        }

        if (name) company.name = name;
        if (description) company.description = description;
        if (website) company.website = website;
        if (location) company.location = location;

        await company.save();

        return res.status(200).json({
            message : "Company information updated",
            company,
            success : true
        })
        
    } catch (err) {
        dbgr(err.message)
    }
}

export const deleteCompany = async (req,res) => {
    try {
        const userId = req.id;
        const companyId = req.params.id;
        let company = await companydb.findOneAndDelete({_id : companyId});
        let jobs = await jobdb.find({company : companyId});

        jobs.map(async (jobData) => {
            await applicationdb.deleteMany({job : jobData._id})
        })

        jobs = await jobdb.deleteMany({company : companyId});
        return res.status(200).json({
            message: "Company Deleted Successfully",
            company,
            jobs,
            success : true
        })
    } catch (error) {
        dbgr(error.message);
    }
}