import Joi from "joi"

const addCompanyVal = Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployees: Joi.number().integer().required(),
    companyEmail: Joi.string().email().required(),
    companyHR: Joi.string()
  });
  const updateCompanyVal = Joi.object({
    companyName: Joi.string(),
    description: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.number().integer(),
    companyEmail: Joi.string().email(),
  });

  export{
    addCompanyVal,
    updateCompanyVal
  }