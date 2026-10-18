import { Router } from 'express';
import { getRoutes } from '../controllers/routingController';

const router = Router();

router.post('/', getRoutes);

export default router;
