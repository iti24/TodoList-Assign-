require("dotenv").config();

console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);
const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "fallbackSecretKey",
};
module.exports = config;