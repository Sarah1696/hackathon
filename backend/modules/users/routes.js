import UserController from "./controller.js";
import express from 'express'
const router = express.Router()
router.post('/register', UserController.createUser(req,res))
router.post('/login', UserController.loginUser(req,res))
router.get('/logout', UserController.logoutUser(req,res))