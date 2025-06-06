import { Router } from 'express';
import { usersRouter } from './users.routes';
import { updatesRouter } from './updates.routes';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/users', usersRouter);
router.use('/updates', updatesRouter);

export const apiRouter: Router = router;
