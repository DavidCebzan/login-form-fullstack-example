import mongoose from "mongoose";
import EnvConfig from "./envConfig";

export const connectToMongoDB = async () => {
  try {
    if (!EnvConfig.MONGO_DB_URI) {
      console.log("Missing MONGO_DB_URI");
      return;
    }
    await mongoose.connect(EnvConfig.MONGO_DB_URI);
    console.log("Connected to mongo DB");
  } catch (error) {
    console.log("Error connection to MongoDB", JSON.stringify(error));
  }
};
