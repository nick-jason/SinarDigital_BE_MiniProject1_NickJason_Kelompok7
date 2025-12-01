import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const APP_NAME = process.env.APP_NAME || 'MovieRatingApp';

export default {
  PORT,
  NODE_ENV,
  APP_NAME
};
