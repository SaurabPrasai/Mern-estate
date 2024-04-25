import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";

export const test = (req, res, next) => {
  res.send("Hello from controller");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(403, "You are not allowed to update this user"));

  if (req.body.password) {
    if (req.body.password.length < 6)
      return next(errorHandler(403, "Password must be atleast 6 characters"));
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.includes(" "))
      return next(errorHandler(403, "Username must not contain space"));
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );
    const {password,...other}=user._doc
     return res.status(200).json(other)
  } catch (error) {
    next(error);
  }
};
