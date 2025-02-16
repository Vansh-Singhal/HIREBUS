import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    contact : {
        type : Number,
        required : true,
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type : String,
        enum : ["student", "recruiter"],
        required : true
    },
    profile: {
        bio : String,
        skills : [String],
        resume : String,
        resumeOriginalName : {
            type : String,
        },
        company : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Company'
        },
        profilepic : {
            type: String,
            default : ""
        }
    }
},{timestamps:true});

export const userdb = mongoose.model('User',userSchema);