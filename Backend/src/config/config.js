import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGO_DB || 'mongodb://localhost:27017/myapp',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
};

export default config;