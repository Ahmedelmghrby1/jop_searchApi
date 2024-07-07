import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    mobileNumber: { type: String, unique: true },
    recoveryEmail: String,
    DOB: { type: Date, format: 'YYYY-MM-DD' },
    role: String,
    status: String,
    otp: String,
    otpExpires: Date
  }
  ,{
    timestamps:{createdAt:true},
    versionKey : false
    });
  
  
  export const User= model('User', userSchema);  