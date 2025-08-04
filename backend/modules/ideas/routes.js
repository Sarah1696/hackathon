import express from 'express';
import * as IdeasController from './controller.js';

const router = express.Router();

router.get('/getIdeas', IdeasController.listIdeas);
router.get('/getIdea', IdeasController.getIdea);   
router.post('/postIdea', IdeasController.addIdea);


export default router;

