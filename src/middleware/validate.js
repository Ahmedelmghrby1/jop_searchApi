import { AppError } from "../utils/appError.js";

export const validate= (schema)=>{
    return (req,res,next)=>{
        const {error}=schema.validate(req.body,{abortEarly:false});
        if(!error){
            next();
        }else{
            let errors=error.details.map(err=>err.message);
            next(new AppError(errors,401))
            // res.status(400).json(error.details);
        }
}
}