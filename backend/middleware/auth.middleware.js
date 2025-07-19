import Student from "../model/student.model.js";
import jwt from 'jsonwebtoken'

export async function authMiddleware(req,res,next){
    try {
        const token = req.cookies.token || req.header('Authorization');
        if(!token) return res.status(401).json({error:"No token provided"})
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const student = await Student.findById(decoded.id);
        if(!student) return res.status(401).json({error:"Invalid token"})
        
        req.studentId = student._id
        next()
    } catch (error) {
        console.log("Auth middleware error", error)
        return res.status(401).json({
            error:"Invalid token"
        })
    }
}