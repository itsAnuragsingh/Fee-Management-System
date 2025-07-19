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
    const existingStudent = await Student.findOne({ email });
    if (existingStudent){
      return res.status(400).json({ error: "Student Already exists" });
    }

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
      httpOnly: true,
      secure: true,
      sameSite:'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
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

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = generateToken(student._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite:'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
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
      message: "Login successful",
      user: studentData,
    });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

export function logout(req, res){
    res.clearCookie('token')
    res.json({message: "Logout Successful"})
}

export async function getCurrentStudent(req, res) {
  try {
    const student = await Student.findById(req.studentId).select('-password');
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.log('Get current student error:', error);
    res.status(500).json({ error: 'Failed to get student' });
  }
}
 export async function updateProfile(req, res) {
  try {
    const { name, email, phone, course, semester, year } = req.body;
    
    const student = await Student.findById(req.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update fields
    if (name) student.name = name;
    if (email) student.email = email;
    if (phone) student.phone = phone;
    if (course) student.course = course;
    if (semester) student.semester = semester;
    if (year) student.year = year;

    await student.save();

    const studentData = {
      _id: student._id,
      name: student.name,
      email: student.email,
      rollNo: student.rollNo,
      feesPaid: student.feesPaid,
      phone: student.phone,
      course: student.course,
      semester: student.semester,
      year: student.year
    };

    res.json({
      message: 'Profile updated successfully',
      user: studentData
    });

  } catch (error) {
    console.log('Update profile error:', error);
    res.status(500).json({ error: 'Profile update failed' });
  }
}