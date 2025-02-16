import debug from "debug";
import { jobdb } from "../models/job.js";
import { applicationdb } from "../models/application.js";
const dbgr = debug("development:application");

export const applyJob = async (req, res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId){
            return res.status(400).json({
                message : "Job ID is required",
                success : false
            })
        };

        let application = await applicationdb.findOne({job : jobId, applicant : userId});

        if (application){
            return res.status(400).json({
                message : "Application already exists",
                success : false
            })
        };

        const job = await jobdb.findOne({_id : jobId});
        if (!job){
            return res.status(404).json({
                message : "Job not found",
                success : false
            })
        };

        application = await applicationdb.create({
            job : jobId,
            applicant : userId
        });

        job.application.push(application._id);
        await job.save();

        return res.status(201).json({
            message : "Job applied successfully",
            application,
            success : true
        });

    } 
    catch (err) {
        dbgr(err.message);
    }
};

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;

        const applications = await applicationdb.find({
            applicant : userId
        }).populate({
            path : 'job',
            options : {sort : {createdAt:-1}},
            populate : {
                path : 'company',
                options : {sort : {createdAt:-1}},
            }
        });

        if (!applications){
            return res.status(404).json({
                message : "Could not fetch any application",
                success : true
            })
        };

        return res.status(200).json({
            message : "Applications fetched successfully",
            applications,
            success : true
        });

    } catch (err) {
        dbgr(err.message);
    }
}

export const getApplicants = async (req,res) => {
    try {
        let jobId = req.params.id;

        let job = await jobdb.findOne({_id : jobId}).populate({
            path : 'application',
            options : {sort : {createdAt : -1}},
            populate : {
                path : 'applicant',
                options : {sort : {createdAt : -1}}
            }
        });

        if (!job){
            return res.status(404).json({
                message : "Job not found",
                success : false
            })
        }

        return res.status(200).json({
            message : "Applicant data fetched successfully",
            job,
            success : true
        })
    } catch (err) {
        dbgr(err.message);
    }
}

export const updateStatus = async (req,res) => {
    try {
        const { status } = req.body;
        
        const applicationId = req.params.id;

        if (!status) return res.status(400).json({
            message : "Status is missing",
            success : false
        });

        let application = await applicationdb.findOne({_id : applicationId});

        if (!application) return res.status(404).json({
            message : "Applicantion not found",
            success : false
        });

        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message : "Applicant status updates successfully",
            application,
            success : true
        })
    } catch (err) {
        dbgr(err.message);
    }
}