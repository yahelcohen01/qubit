import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:4200'];

export const appConfig = {
  port: process.env.PORT || 3333,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origins: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  api: {
    prefix: '/api',
  },
};
