import express from 'express'
import {register, login, logout, getCurrentStudent, updateProfile} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)
router.get('/me', authMiddleware, getCurrentStudent)
router.patch('/update-profile', authMiddleware, updateProfile);
export default router