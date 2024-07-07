import mongoose, { Types } from "mongoose";
import { model } from "mongoose";
import { Schema } from "mongoose";

const JobSchema = new Schema({
    jobTitle: String,
    jobLocation: String,
    workingTime: String,
    seniorityLevel: String,
    jobDescription: String,
    technicalSkills: [String], // Array of skills
    softSkills: [String], // Array of skills
    addedBy: { type: String, ref: 'User' } ,// Reference to the companyHrId
    company:{type:mongoose.Types.ObjectId, ref:'Company'}
  },{
    timestamps:{createdAt:true},
    versionKey : false
    });


  export const Job= model('Job', JobSchema); 