import UserController from "./controller.js";
import express from 'express'
import limiter from '../../middlewares/limiter.js'

const router = express.Router()


router.post('/register', limiter, UserController.createUser)
router.post('/login', limiter, UserController.loginUser)


export default router


