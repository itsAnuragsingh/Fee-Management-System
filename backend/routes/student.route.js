import express from 'express'
import { getAllStudents, getStudentById ,updateFeeStatus, getStats} from '../controllers/student.controller.js'
const router = express.Router()

router.get('/',getAllStudents)
router.get('/stats', getStats)
router.get('/:id', getStudentById)
router.put('/:id/fee-status', updateFeeStatus)

export default router