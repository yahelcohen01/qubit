import { Router } from 'express';
import { getUpdates } from '../controllers/updates.controller.js';

const router = Router();

router.get('/', getUpdates);

export const updatesRouter: Router = router;
