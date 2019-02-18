import { Router } from 'express';
import { normalize } from 'path';
import { existsSync, readFileSync } from 'fs';
const router = Router();

router.get('/', (req, res, next) => {
  const pathLocation = normalize(
    `${require.resolve('enum-converter')}/../../package.json`
  );

  console.log('path location', pathLocation);

  if (existsSync(pathLocation)) {
    const version = JSON.parse(readFileSync(pathLocation)).version;
    return res.json({ version, environment: process.env.NODE_ENV });
  } else {
    throw new Error('could not read enum-converter package');
  }
});

export default router;
