import { Router } from 'express';
import convertRouter from './convert';
import optionsRouter from './options';

const router = Router();

router.use('/options', optionsRouter);
router.use('/convert', convertRouter);

export default router;
