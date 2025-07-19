import express from 'express'
import {config} from 'dotenv'
import { dbConnect } from './lib/db.js';
import authRoutes from './routes/auth.route.js'
import studentRoutes from './routes/student.route.js'
import paymentsRoutes from './routes/payment.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
config()
dbConnect()
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: [
    'https://edupay-fee.vercel.app',
    'https://edupay-fee.vercel.app/',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/students',studentRoutes )
app.use('/api/payments', paymentsRoutes)
app.get("/api/health", (req, res)=>{
    res.send("All good !")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:3000`)
})