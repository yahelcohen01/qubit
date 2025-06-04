import express from 'express';
import { appConfig } from './config/app.config';
import { setupCommonMiddleware } from './middleware/common.middleware';
import { apiRouter } from './routes';

const app = express();

// Setup common middleware
setupCommonMiddleware(app);

// Mount API routes
app.use(appConfig.api.prefix, apiRouter);

// Start server
const server = app.listen(appConfig.port, () => {
  console.log(`Server is running at http://localhost:${appConfig.port}`);
  console.log(
    `API is available at http://localhost:${appConfig.port}${appConfig.api.prefix}`
  );
});

server.on('error', console.error);
