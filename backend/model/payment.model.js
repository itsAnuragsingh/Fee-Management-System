import mongoose, { MongooseError } from "mongoose";

const paymentSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  cardholderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "completed",
  },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema)
export default Payment
