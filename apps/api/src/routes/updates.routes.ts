import { RequestHandler, Router } from 'express';
// import { getUpdates } from '../controllers/updates.controller';

const router = Router();

const getUpdates: RequestHandler = (req, res) => {
  res.json({ message: 'Hello World' });
};

router.get('/', getUpdates);

export const updatesRouter: Router = router;
