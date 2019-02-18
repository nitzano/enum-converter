import { Router } from 'express';
import optionsRouter from './options';
import versionRouter from './version';
import convertRouter from './convert';

const router = Router();

router.use('/options', optionsRouter);
router.use('/version', versionRouter);
router.use('/convert', convertRouter);

export default router;
