import { Company } from "../../../database/models/company.model.js";
import { Job } from "../../../database/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";


// Add Company
const addCompany = catchError(async (req, res) => {
    req.body.companyHR = req.user.userId
    let company = await Company.insertMany(req.body);
    res.status(200).json({ message: "Company added successfully", company });
})


// Update Company
const updateCompany = catchError(async (req, res,next) => {
    let company = await Company.findByIdAndUpdate(req.params.id , req.body, { new: true})
    if(!company){
        return next(new AppError("Company not found",404))
    }
    res.status(200).json({ message: "Company updated successfully", company });
})

// Delete Company
const deleteCompany = catchError(async (req, res,next) => {
    const company = await Company.findByIdAndDelete(req.params.id)
    if(!company){
        return next(new AppError("Company not found",404))
    }
    res.status(200).json({ message: "Company deleted successfully"});
})
// Get company data 
const getCompany = catchError(async (req, res,next) => {
    const company = await Company.findById(req.params.id)
    if(!company){
        return next(new AppError("Company not found",404))
    }
    const jobs = await Job.find({ company:req.params.companyId });
    res.status(200).json({ message: "Company data", company, jobs });
})
// Search for a company with a name. 
const searchCompany = catchError(async (req, res,next) => {
    const company = await Company.find({ companyName: req.params.name });
    if(!company){
        return next(new AppError("Company not found",404))
    }
    res.status(200).json({ message: "Company data", company });
})

export{
    addCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    searchCompany
    
}