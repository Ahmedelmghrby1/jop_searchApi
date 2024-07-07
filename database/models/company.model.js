import { Schema, model } from "mongoose";

const CompanySchema = new Schema({
    companyName: { type: String, unique: true },
  description: String,
  industry: String,
  address: String,
  numberOfEmployees: String,
  companyEmail: { type: String, unique: true },
  companyHR: { type:Schema.Types.ObjectId, ref: 'User' }
  },{
    timestamps:{createdAt:true},
    versionKey : false
    }
)
export const Company= model('Company', CompanySchema); 