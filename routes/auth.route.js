import express from 'express';
import { body } from 'express-validator';

import { login, register } from '../controllers/auth.controller.js';
import { validationBodyLogin, validationBodyRegister } from '../middleware/validationBodies.js';
import { validationResultExpress } from '../middleware/validationResult.js';

const router = express.Router();

router.post(
  '/register',
  // comprobaciones de express-validator
  validationBodyRegister,
  validationResultExpress,
  register
);

router.post('/login', validationBodyLogin, validationResultExpress, login);

export default router;
