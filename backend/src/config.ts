import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT || 3001,
  STACKONE_API_KEY: Buffer.from(process.env.STACKONE_API_KEY || "").toString('base64'),
  STACKONE_CONNECTION_URL: 'https://api.stackone.com/connect_sessions',
  STACKONE_ATS_URL: 'https://api.stackone.com/unified/ats'
};