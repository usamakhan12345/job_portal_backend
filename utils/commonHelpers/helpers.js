import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import Randomstring from "randomstring";

configDotenv();

export const bcryptPassword = (password) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

export const assignJwtToken = (email, password) => {
  return jwt.sign({ email, password }, process.env.JWT_SCRET_KEY, {
    expiresIn: "1h",
  });
};

export const compareBcryptPassword = async (hashPassword, password) => {
  return await bcrypt.compare(password, hashPassword);
};

export const generateRandomString = (length, type) => {
  return Randomstring.generate({
    length,
    charset: type,
  });
};
