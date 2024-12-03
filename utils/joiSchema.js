import joi from "joi";
export const userSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(12).required(),
});

export const otpJoiSchema = joi.object({
  email: joi.string().email().required(),
});
