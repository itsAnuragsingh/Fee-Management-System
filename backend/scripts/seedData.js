import mongoose from 'mongoose';
import bcrypt from'bcryptjs'
import {config} from 'dotenv'
config()

import Student from '../model/student.model.js';

// Sample students data
const studentsData = [
 
  {
    name: 'Priya Verma',
    email: 'priya@example.com',
    password: 'password123',
    phone: '9876543202',
    course: 'Information Technology',
    semester: 4,
    year: 2024,
    feesPaid: true
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan@example.com',
    password: 'password123',
    phone: '9876543203',
    course: 'Electronics',
    semester: 2,
    year: 2024,
    feesPaid: false
  },
  {
    name: 'Sneha Patel',
    email: 'sneha@example.com',
    password: 'password123',
    phone: '9876543204',
    course: 'Computer Science',
    semester: 8,
    year: 2024,
    feesPaid: true
  },
  {
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    password: 'password123',
    phone: '9876543205',
    course: 'Mechanical Engineering',
    semester: 3,
    year: 2024,
    feesPaid: false
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya@example.com',
    password: 'password123',
    phone: '9876543206',
    course: 'Civil Engineering',
    semester: 5,
    year: 2024,
    feesPaid: false
  },
  {
    name: 'Karan Deshmukh',
    email: 'karan@example.com',
    password: 'password123',
    phone: '9876543207',
    course: 'Information Technology',
    semester: 7,
    year: 2024,
    feesPaid: true
  }
];


async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany({});
    console.log('Cleared existing students');

    // Create students
    for (let i = 0; i < studentsData.length; i++) {
      const studentData = studentsData[i];
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(studentData.password, salt);
      
      // Create student
      const student = new Student({
        name: studentData.name,
        email: studentData.email,
        password: hashedPassword,
        phone: studentData.phone,
        course: studentData.course,
        semester: studentData.semester,
        year: studentData.year,
        feesPaid: studentData.feesPaid
      });

      await student.save();
      console.log(`Created student: ${student.name} - Roll No: ${student.rollNo}`);
    }

    console.log('Database seeding completed!');
    console.log('Demo login credentials:');
    console.log('Email: john@example.com, Password: password123');
    console.log('Email: jane@example.com, Password: password123 (Fees Paid)');

  } catch (error) {
    console.log('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();

