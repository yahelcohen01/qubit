import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { appConfig } from '../config/app.config';

export const setupCommonMiddleware = (app: express.Application) => {
  // Enable Cross Origin Resource Sharing
  app.use(
    cors({
      origin: appConfig.cors.origin,
    })
  );

  // Security middleware
  app.use(helmet());

  // Request logging
  app.use(morgan('dev'));

  // Parse JSON bodies
  app.use(express.json());

  // Parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));
};
