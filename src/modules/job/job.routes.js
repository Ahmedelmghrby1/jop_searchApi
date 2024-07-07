import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { addjobVal, updatejobVal } from "./job.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addJob, deleteJob, getAllJobs, getJobsByCompany, updateJob } from "./job.controller.js";
import { checkHr } from "../../middleware/checkCompany.js";


const jobRouter = Router();

jobRouter.post("/:id",validate(addjobVal),verifyToken,checkHr,addJob)
jobRouter.patch("/:id",validate(updatejobVal),verifyToken,checkHr,updateJob)
jobRouter.delete("/:id",verifyToken,checkHr,deleteJob)
jobRouter.get("/alljob",verifyToken,getAllJobs)
jobRouter.get("/company",verifyToken,getJobsByCompany)







export default jobRouter
