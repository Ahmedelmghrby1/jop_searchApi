import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { signinVal, signupVal } from "./user.validation.js";
import { checkEmail } from "../../middleware/checkEmailorMobile.js";
import { deleteAccount, forgetPassword, getAccountData, getProfileData, resetPassword, signin, signup, updateAccount, updatePassword, verify } from "./user.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const userRouter = Router();

userRouter.post("/signup", validate(signupVal) ,checkEmail, signup);
userRouter.post("/signin", validate(signinVal),signin);
userRouter.patch("/updateAccount/:id", verifyToken,updateAccount);
userRouter.delete("/deleteAccount/:id", verifyToken,deleteAccount);
userRouter.get("/getAccountData/:id", verifyToken,getAccountData);
userRouter.get("/getProfileData/:id",getProfileData);
userRouter.patch("/updatePassword/:id",verifyToken,updatePassword);
userRouter.post("/forgetpassword", forgetPassword);
userRouter.post("/verifypassword", verify);
userRouter.post("/resetpassword", resetPassword);
















export default userRouter;

