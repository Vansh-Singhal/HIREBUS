import debug from "debug";
import { jobdb } from "../models/job.js";
import { applicationdb } from "../models/application.js";
const dbgr = debug("development:jobController");

export const postJob = async (req,res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, company} = req.body;

        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !company){
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })  
        };

        let job = await jobdb.create({
            title,
            description,
            requirements : requirements.split(","),
            salary,
            location,
            jobType,
            experience,
            position,
            company,
            created_by : userId
        });

        return res.status(201).json({
            message : "New job created successfully",
            job,
            success : true
        })
    } catch (err) {
        dbgr(err.message);
    }
}

export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {title : {$regex:keyword, $options:"i"}},
                {description : {$regex:keyword, $options:"i"}}
            ]
        };

        const jobs = await jobdb.find(query).populate({
            path : "company"
        }).sort({createdAt:-1});

        if (!jobs){
            return res.status(404).json({
                message : "Jobs not found",
                success : false
            })
        };

        return res.status(200).json({
            message: "Jobs found successfully",
            jobs,
            success : true
        });
    } catch (err) {
        dbgr(err.message);
    }
}

export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await jobdb.findOne({_id : jobId}).populate({
            path : 'company'
        }).populate({
            path : 'application'
        });

        if (!job) return res.status(404).json({
            message : "Job not found",
            success : false
        })

        return res.status(200).json({
            message : "Job fetched Successfully",
            job,
            success : true
        })
    } catch (err) {
        dbgr(err.message);
    }
}

export const getJobsByAdmin = async (req,res) => {
    try {
        const userId = req.id;
        const jobs = await jobdb.find({created_by : userId}).populate({
            path : 'company'
        }).populate({
            path : 'application'
        });

        if (!jobs){
            return res.status(404).json({
                message : "No jobs found",
                success : false
            })
        };

        return res.status(200).json({
            message : "Jobs fetched successfully",
            jobs,
            success : true
        });
    } catch (err) {
        dbgr(err.message);
    }
}

export const deleteJob = async (req,res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;
        const job = await jobdb.findOneAndDelete({created_by : userId,
            _id : jobId
        });
        let applications = await applicationdb.deleteMany({job : jobId});

        return res.status(200).json({
            message: "Job Deleted Successfully",
            job,
            applications,
            success : true
        })
    }
    catch(err){
        dbgr(err.message);
    }
}