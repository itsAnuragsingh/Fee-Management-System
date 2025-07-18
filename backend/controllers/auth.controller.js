import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../model/student.model.js";

function generateToken(studentId) {
  return jwt.sign({ id: studentId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function register(req, res) {
  try {
    const { name, email, password, course, semester, year, phone } = req.body;
    const existingStudent = await Student.findOne({email});
    if (existingStudent)
      res.status(400).json({ error: "Student Already exists" });

    const student = new Student({
      name,
      email,
      password,
      phone,
      course,
      semester,
      year,
    });
    await student.save();
    const token = generateToken(student._id);

    res.cookie("token", token, {
      tpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const studentData = {
      _id: student._id,
      name: student.name,
      email: student.email,
      rollNo: student.rollNo,
      feesPaid: student.feesPaid,
      phone: student.phone,
      course: student.course,
      semester: student.semester,
      year: student.year,
    };

    res.status(201).json({
      message: "Registration successful",
      user: studentData,
    });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
}


