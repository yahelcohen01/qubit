import * as dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  port: process.env.PORT || 3333,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  api: {
    prefix: '/api',
  },
} as const;
