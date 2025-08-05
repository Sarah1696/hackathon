import UserController from "./controller.js";
import express from 'express'

const router = express.Router()

router.post('/register', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)

export default router


