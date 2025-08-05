import express from 'express';
import { listIdeas, getIdea, addIdea } from './controller.js';

const router = express.Router();

router.get('/', listIdeas);
router.get('/:id', getIdea);
router.post('/', addIdea);

export default router;
