import express from 'express'
import { processPayment, getStudentPayments, getAllPayments } from '../controllers/payment.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()
router.post('/process', authMiddleware,processPayment)
router.get('/', authMiddleware, getStudentPayments)
router.get('/all', getAllPayments)

export default router