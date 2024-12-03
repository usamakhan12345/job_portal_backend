import { otpJoiSchema } from "../utils/joiSchema.js";
import { generateRandomString } from "../utils/commonHelpers/helpers.js";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";

export const generateOtpCode = async (req, res) => {
  try {
    await otpJoiSchema.validateAsync(req.body);

    const { email } = req.body;
    if (!email) {
      return res.send({
        message: "Email is required",
        success: false,
        error: true,
      });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.send({ message: "Email is not exist" });
    }

    const otpCode = generateRandomString(6, "numeric");

    await Otp.findOneAndUpdate({ email, otpCode, new: true });

    const otpModel = new Otp({ email, otpCode });
    await otpModel.save();

    return res.send({
      message: "otp Generate Successfuly",
      error: false,
      success: true,
      otpCode,
    });
  } catch (error) {
    return res.send({ success: false, error: true, message: error.message });
  }
};
