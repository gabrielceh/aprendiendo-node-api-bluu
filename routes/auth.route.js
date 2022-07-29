import { Router } from 'express';
import { body } from 'express-validator';

import { requireToken } from '../middleware/requireToken.js';
import { requireRefreshToken } from '../middleware/requireRefreshToken.js';
import { validationBodyLogin, validationBodyRegister } from '../middleware/validationManager.js';
import { login, register, userInfo, refreshToken, logout } from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/register',
  // comprobaciones de express-validator
  validationBodyRegister,
  register
);

router.post('/login', validationBodyLogin, login);

router.get('/user-info', requireToken, userInfo);

router.get('/refresh', requireRefreshToken, refreshToken);

router.get('/logout', logout);

export default router;
