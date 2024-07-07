import Joi from "joi"

const signupVal=Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required().min(6).max(30),
    mobileNumber: Joi.string().required(),
    recoveryEmail:Joi.string().required(),
    DOB: Joi.date().required(),
    role: Joi.string().valid('User', 'Company_HR').required(),
  status: Joi.string().valid('online', 'offline').required(),
})

const signinVal=Joi.object({
    email:Joi.string().email(),
    mobileNumber:Joi.string(),
    password:Joi.string().required().min(6).max(30),
})


export{
    signupVal,
    signinVal
}