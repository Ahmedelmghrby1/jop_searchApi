import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { generateOTP, sendEmail, verifyOTP } from "../../../email/email.js";



const signup = catchError(async (req, res) => {
    let user = await User.insertMany(req.body);
    // sendEmail(req.body.email);
    user[0].password = undefined;
    res.status(201).json({ message: "success", user });
  });

  const signin = catchError(async (req, res,next) => {
    let user = await User.findOne({
        $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
      })
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("incorrect email or password",401));
    jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      "myNameIsAhmed",
      (err, token) => {
        res.json({ message: "success", token });
      }
    );
  });

const updateAccount = catchError(async (req, res, next) => {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
    });
  
    if (existingUser) {
      return next(new AppError('Email or mobile number is already in use', 400));
    }
  
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
    res.status(200).json({ message: 'success', user });
  });

//   Delete account
const deleteAccount = catchError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new AppError('Account not found', 404));
    }
    res.status(200).json({ message: 'Account deleted successfully' });
})
// getAccountData
const getAccountData = catchError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new AppError('Account not found', 404));
    }
    res.status(200).json({ message: 'success', user });
})
// getProfileData 
const getProfileData = catchError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new AppError('Account not found', 404));
    }
    user.password = undefined;
    res.status(200).json({ message: 'success', user });
})

// updatePassword
const updatePassword = catchError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError('Account not found', 404));
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      return next(new AppError('Password is already in use', 400));
    }
    user.password = bcrypt.hashSync(req.body.password, 8);
    await user.save();
  
    res.json({ message: 'Password updated successfully' });
  });

//   Forget Password
const forgetPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Account not found', 404));
  }
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  await user.save();
  sendEmail(req.body.email, otp);
  res.json({ message: 'OTP sent successfully' });
})

// verifyOTP
const verify = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Account not found', 404));
  }
  const otp=verifyOTP(req.body.email,req.body.otp)
  res.json({ message: 'verify successfully'});
})

// resetpassword
const resetPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Account not found', 404));
  }
  user.password = bcrypt.hashSync(req.body.password, 8);
  user.otp=undefined
  user.otpExpires=undefined
  await user.save();
  res.json({ message: 'Password updated successfully' });
})




  export{
    signup,
    signin,
    updateAccount,
    deleteAccount,
    getAccountData,
    getProfileData,
    updatePassword,
    forgetPassword,
    verify,
    resetPassword
  }