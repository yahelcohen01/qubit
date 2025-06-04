import { Router } from 'express';
import { usersRouter } from './users.routes';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mount routes
router.use('/users', usersRouter);

export const apiRouter: Router = router;
