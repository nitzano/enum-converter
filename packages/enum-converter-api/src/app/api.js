import { Router } from 'express';
import convertRouter from './convert';

const router = Router();

router.use('/convert', convertRouter);

export default router;
