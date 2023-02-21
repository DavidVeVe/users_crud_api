require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  apiKey: process.env.API_KEY,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET
};

module.exports = config;
