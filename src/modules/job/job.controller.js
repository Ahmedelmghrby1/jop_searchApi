import { Job } from "../../../database/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

// Add job
const addJob = catchError(async (req, res) => {
    req.body.addedBy = req.user.userId
    let job = await Job.insertMany(req.body);
    res.status(200).json({ message: "job added successfully", job });
})

// Update Job
const updateJob = catchError(async (req, res,next) => {
    let job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
    if(!job){
        return next(new AppError("Job not found",404))
    }
    res.status(200).json({ message: "job updated successfully", job });

})
// Delete Job
const deleteJob = catchError(async (req, res,next) => {
    let job = await Job.findOneAndDelete({ _id: req.params.id })
    if(!job){
        return next(new AppError("Job not found",404))
    }
    res.status(200).json({ message: "job deleted successfully"});
})
// Get all Jobs with their company’s information.
const getAllJobs = catchError(async (req, res) => {
    let jobs = await Job.find().populate("company").exec();;
    res.status(200).json({ jobs });
})

// Get all Jobs for a specific company by name.
const getJobsByCompany = catchError(async (req, res) => {
    let jobs = await Job.find({ companyName: req.params.name }).populate("company");
    res.status(200).json({ jobs });
})



export{
    addJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getJobsByCompany
}