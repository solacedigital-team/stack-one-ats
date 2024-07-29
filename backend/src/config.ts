import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT || 3001,
  STACKONE_API_KEY: process.env.STACKONE_API_KEY,
  STACKONE_API_URL: 'https://api.stackone.com/connect_sessions'
};
