import mongoose from "mongoose";

let jobSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    requirements : {
        type : [String],
        required : true 
    },
    salary : {
        type : String,
        required: true
    },
    location : {
        type : String,
        required: true
    },
    jobType : {
        type : String,
        required: true
    },
    experience : {
        type : String,
        required : true
    },
    position : {
        type : Number,
        required: true
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Company',
        required : true
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    application : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Application',
    }]
},{timestamps:true});

export const jobdb = mongoose.model("Job",jobSchema);