import Student from "../model/student.model.js";
import jwt from 'jsonwebtoken'

export async function authMiddleware(req,res,next){
    try {
        let token = null;
        
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
            console.log("Token found in cookies");
        }
       
        if (!token) {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); 
                console.log("Token found in Authorization header");
            } else if (authHeader && !authHeader.startsWith('Bearer ')) {
                // Handle case where Bearer prefix might be missing
                token = authHeader;
                console.log("Token found in Authorization header (no Bearer prefix)");
            }
        }

        if (!token) {
            console.log("No token found in cookies or Authorization header");
            console.log("Available cookies:", req.cookies);
            console.log("Authorization header:", req.headers.authorization);
            return res.status(401).json({ error: "No token provided" });
        }
        
        console.log("Token found:", token.substring(0, 20) + "..."); 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);
        
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