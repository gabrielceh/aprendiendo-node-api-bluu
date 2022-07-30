import { Router } from 'express';
import {
  createLink,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from '../controllers/link.controller.js';
import { requireToken } from '../middleware/requireToken.js';
import { bodyLinkValidator, paramsLinkValidator } from '../middleware/validationManager.js';
const router = Router();

//RUTAS
// GET        /api/vi/links      all links
// GET        /api/vi/links:id   all links
// POST       /api/vi/links      create link
// PATCH/PUT  /api/vi/links/:id  update link
// DELETE     /api/vi/links/:id  remove link

router.get('/', requireToken, getLinks);
router.get('/:nano_link', getLink);
router.post('/', requireToken, bodyLinkValidator, createLink);
router.delete('/:id', requireToken, paramsLinkValidator, removeLink);
router.patch('/:id', requireToken, paramsLinkValidator, bodyLinkValidator, updateLink);
export default router;
