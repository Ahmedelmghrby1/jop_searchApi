import Joi from "joi"

const addjobVal = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation:Joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime:Joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel:Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription:Joi.string().required(),
    technicalSkills:Joi.array().required(),
    softSkills:Joi.array().required(),
    addedBy:Joi.string()
})

const updatejobVal = Joi.object({
    jobTitle: Joi.string(),
    jobLocation:Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime:Joi.string().valid('part-time', 'full-time'),
    seniorityLevel:Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription:Joi.string(),
    technicalSkills:Joi.array(),
    softSkills:Joi.array(),
    addedBy:Joi.string()
})

export{
    addjobVal,
    updatejobVal
}