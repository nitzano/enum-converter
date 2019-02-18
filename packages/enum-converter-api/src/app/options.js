import { Router } from 'express';
import {
  convertString,
  Language,
  StringStyle,
  EnumsOrder,
  ValuesOrder,
  LanguageSuffix
} from 'enum-converter';

const router = Router();

router.get('/languages', (req, resp) => {
  return resp.json({ Language });
});

router.get('/enums', (req, resp, next) => {
  return resp.json({ StringStyle, EnumsOrder, ValuesOrder, LanguageSuffix });
});

export default router;
