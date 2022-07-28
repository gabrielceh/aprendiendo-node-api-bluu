import { Router } from 'express';
import { body } from 'express-validator';

import { login, register, userInfo, refreshToken, logout } from '../controllers/auth.controller.js';
import { requireToken } from '../middleware/requireToken.js';
import { validationBodyLogin, validationBodyRegister } from '../middleware/validationBodies.js';
import { validationResultExpress } from '../middleware/validationResult.js';

const router = Router();

router.post(
  '/register',
  // comprobaciones de express-validator
  validationBodyRegister,
  validationResultExpress,
  register
);

router.post('/login', validationBodyLogin, validationResultExpress, login);

router.get('/user-info', requireToken, userInfo);

router.get('/refresh', refreshToken);

router.get('/logout', logout);

export default router;
