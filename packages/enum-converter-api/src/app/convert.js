import { Router } from 'express';
import { convertString } from 'enum-converter';

const router = Router();

router.post('/', (req, resp, next) => {
  let body = req.body;
  let enumString = body.enum;
  let enumConfiguration = body.configuration;

  if (!enumString || !enumConfiguration) {
    const error = new Error('could not find enum and configuration in request');
    error.status = 400;
    throw error;
  }

  try {
    const result = convertString(enumString, enumConfiguration);
    resp.json({ result });
  } catch (err) {
    const error = new Error('Conversion Failed');
    error.status = 400;
    throw error;
  }
});

export default router;
