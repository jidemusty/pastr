import { Router } from 'express'
import { pasteController } from '../controllers/paste.controller';
import { validateCreatePaste } from '../middleware/validation.middleware'

const router = Router();

// POST /api/pastes - create a new paste
router.post('/', validateCreatePaste, (req, res, next) => pasteController.createPaste(req, res, next));

// GET /api/pastes/list - get all pastes
router.get('/list', (req, res, next) => pasteController.getAllPastes(req, res, next));

// GET /api/pastes/:shortId/raw - get raw paste content
router.get('/:shortId/raw', (req, res, next) => pasteController.getRawPaste(req, res, next));

// GET /api/pastes/:shortId - get paste by shortId
router.get('/:shortId', (req, res, next) => pasteController.getPaste(req, res, next));

export default router;