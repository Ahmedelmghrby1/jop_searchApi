import bcrypt from "bcrypt";
import { User } from "../../database/models/user.model.js";
import { AppError } from "../utils/appError.js";
export const checkEmail = async (req, res, next) => {
  let isfound = await User.findOne({ $or: [{ email: req.body.emailOrMobile }, { mobileNumber: req.body.emailOrMobile }] });
  if (isfound) return next(new AppError("Email Or Mobile already exists",409))
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
