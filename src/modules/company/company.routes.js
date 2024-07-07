import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { addCompanyVal, updateCompanyVal } from "./company.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addCompany, deleteCompany, getCompany, searchCompany, updateCompany } from "./company.controller.js";
import { checkCompany, checkHr } from "../../middleware/checkCompany.js";


const companyRouter = Router();
companyRouter.post("/:id",validate(addCompanyVal),verifyToken,checkCompany,addCompany)
companyRouter.patch("/:id",validate(updateCompanyVal),verifyToken,checkHr,checkCompany,updateCompany)
companyRouter.delete("/:id",verifyToken,checkHr,deleteCompany)
companyRouter.get("/:id",verifyToken,getCompany)
companyRouter.get("/get/:name",verifyToken,searchCompany)




export default companyRouter