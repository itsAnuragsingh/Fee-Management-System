import Student from "../model/student.model.js";
import Payment from "../model/payment.model.js"

export async function processPayment(req,res) {
    try {
        const { cardholderName,cardNumber, amount } = req.body;
        const studentId = req.studentId;
        const student = await Student.findById(studentId);
        if(!student) return res.status(404).json({ error: 'Student not found' });
        if(student.feesPaid) return res.status(400).json({ error: 'Fees already paid' })

        await new Promise(resolve => setTimeout(resolve,2000))
        const transactionId = 'TXN' + Date.now() + Math.floor(Math.random()*1000)
        const payment = new Payment({
            studentId:studentId,
            transactionId:transactionId,
            amount:amount,
            cardNumber:cardNumber,
            cardholderName:cardholderName,
            status: 'completed'
        })
        await payment.save();
        student.feesPaid = true;
        await student.save()
        res.json({
            message:"Payment processed successfully",
            student:{
                _id:student._id,
                name:student.name,
                email:student.email,
                feesPaid:student.feesPaid
            }
        })
    } catch (error) {
        res.status(500).json({error:"Payment processing failed"})
    }    
}

export async function getStudentPayments(req,res){
    try {
        const payments = await Payment.find({studentId:req.studentId}).sort({ createdAt: -1 });
        res.json(payments)
    } catch (error) {
        console.log('Get payments error:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
}
export async function getAllPayments(req,res){
    try {
        const payments = await Payment.find({}).populate('studentId', 'name email')
      .sort({ createdAt: -1 });
        res.json(payments)
    } catch (error) {
        console.log('Get payments error:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
}