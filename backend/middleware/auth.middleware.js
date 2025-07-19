import Student from "../model/student.model.js";
import jwt from 'jsonwebtoken'

export async function authMiddleware(req,res,next){
    try {

        let token = req.cookies?.token;
        if (!token) {
            const authHeader = req.header('Authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); 
            }
        }

        if (!token) {
            console.log("No token found in cookies or Authorization header");
            return res.status(401).json({ error: "No token provided" });
        }
        
        console.log("Token found:", token.substring(0, 20) + "..."); 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);
        
        // Find student
        const student = await Student.findById(decoded.id);
        if (!student) {
            console.log("Student not found for id:", decoded.id);
            return res.status(401).json({ error: "Invalid token" });
        }
        
        console.log("Student authenticated:", student.email);
        req.studentId = student._id;
        next();
        
    } catch (error) {
        console.log("Auth middleware error:", error.message);
        return res.status(401).json({
            error: "Invalid token"
        });
    }
}