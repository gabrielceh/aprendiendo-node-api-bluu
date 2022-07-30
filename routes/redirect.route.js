import { Router } from 'express';
import { redirectLink } from '../controllers/redirect.controller.js';

const router = Router();

router.get('/:nano_link', redirectLink);

export default router;
