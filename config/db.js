import mongoose from "mongoose";
import { configDotenv } from "dotenv";

export const connectDatabase = async () => {
  configDotenv();
  try {
    const result = await mongoose.connect(process.env.MONGO_DB_URL);
    if (result) {
      console.log("Database Connected Successfuly");
    }
  } catch (error) {
    console.log("Database not connected ");
  }
};
