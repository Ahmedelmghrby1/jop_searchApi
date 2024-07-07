import { Company } from "../../database/models/company.model.js"


 const checkCompany = async (req, res, next) => {
    let isfound = await Company.findOne({ $or: [{ companyEmail: req.body.companyEmail }, { companyName: req.body.companyName }] })
    if(isfound) return res.status(400).json({message:"companyEmail or companyName already exists"})
        next()
}
const checkHr = async(req, res, next) => {
    let Hr = await Company.findOne({companyHR:req.user.userId})
    if(!Hr) return res.status(400).json({message:"you are not a HR"})
        next()
}
export{
    checkCompany,
    checkHr
}