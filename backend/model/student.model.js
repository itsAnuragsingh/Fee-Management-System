import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    unique: true,
    sparse: true,
  },
  feesPaid: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
  },
  course: {
    type: String,
  },
  semester: {
    type: Number,
    min: 1,
    max: 8,
  },
  year: {
    type: Number,
  },
},{timestamps: true});

studentSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Generate roll number before saving
studentSchema.pre('save', async function(next) {
  if (!this.rollNo && this.isNew) {
    const currentYear = new Date().getFullYear();
    const shortYear = currentYear.toString().slice(-2);
    
    // Get course code (first 2 letters of course)
    const courseCode = this.course ? this.course.substring(0, 2).toUpperCase() : 'CS';
    
    // Count existing students for this year and course
    const count = await this.constructor.countDocuments({
      rollNo: { $regex: `^${shortYear}${courseCode}` }
    });
    
    // Generate roll number: YearCourseCode + 4-digit number
    this.rollNo = `${shortYear}${courseCode}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student