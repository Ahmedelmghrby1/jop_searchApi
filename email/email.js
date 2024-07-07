import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { User } from "../database/models/user.model.js";
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-character OTP
};
const verifyOTP = async (userId, otp) => {
  const user = await User.findById(userId);
  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    throw new Error('Invalid or expired OTP');
  }
  return user;
};
 const sendEmail=async(email,OTP)=>{
    const transporter = nodemailer.createTransport({
      
        service:"gmail",
        auth: {
          user: "elmghrby025@gmail.com",
          pass: "jonovazbebghcucz",
        },
      });

      jwt.sign({email},'myNameIsAhmed',async(err,token)=>{
        const info = await transporter.sendMail({
            from: '"elmghraby Node"<elmghrby025@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `${OTP}`, // html body
          });
      })

 
}

export{
  generateOTP,
  verifyOTP,
  sendEmail
}