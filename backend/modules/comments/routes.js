import CommentsController from './controller.js'

import express, {Router} from 'express'
const app = express()
const router = Router()

router.get('/getComments', CommentsController.getComments)
router.post('/postComments', CommentsController.postComments)

export default router