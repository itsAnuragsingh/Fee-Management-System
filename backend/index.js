import express from 'express'
import {config} from 'dotenv'
import { dbConnect } from './lib/db.js';
import authRoutes from './routes/auth.route.js'
import studentRoutes from './routes/student.route.js'
import paymentsRoutes from './routes/payment.route.js'
import cookieParser from 'cookie-parser';
config()
dbConnect()
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/students',studentRoutes )
app.use('/api/payments', paymentsRoutes)
app.get("/api/health", (req, res)=>{
    res.send("All good !")
})

app.listen(3000, ()=>{
    console.log(`Server is running on port http://loalhost:3000`)
})