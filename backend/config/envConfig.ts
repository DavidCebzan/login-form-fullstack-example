import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? "",
};
