import User from "../models/userModel.js";
import {
  bcryptPassword,
  compareBcryptPassword,
  assignJwtToken,
} from "../utils/commonHelpers/helpers.js";
import { userSchema } from "../utils/joiSchema.js";

export const signup = async (req, res) => {
  try {
    await userSchema.validateAsync(req.body);

    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.send({
        message: "Please Send All Required Fields",
      });
    }

    const hashPassword = bcryptPassword(password);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.send({
        status: "200",
        message: "User Already Exist",
      });
    }

    const user = new User({ name, lastName, email, password: hashPassword });
    await user.save();

    const userToken = assignJwtToken(email, name);

    return res.send({
      status: "200",
      message: "user create successfuly",
      token: userToken,
    });
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ message: "All fields are required " });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.send({ message: "user not exist" });
    }

    const isMatchPassword = await compareBcryptPassword(
      existUser.password,
      password
    );
    if (!isMatchPassword) {
      return res.send({ message: "Password Dosn't Match" });
    }

    const userToken = assignJwtToken(existUser.email);

    return res
      .status(200)
      .send({ message: "User Login Successfuly", token: userToken });
  } catch (error) {
    return res.send({ message: error.message });
  }
};
