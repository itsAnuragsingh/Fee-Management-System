import Student from "../model/student.model.js";

export async function getAllStudents(req, res) {
  try {
    const student = await Student.find({}).select("-password");
    res.json(student);
  } catch (error) {
    console.log("Get student error:", error);
    res.status(500).json({
      error: "failed to fetch students",
    });
  }
}

export async function getStudentById(req, res) {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({
      error: "failed to fetch student",
    });
  }
}
export async function updateFeeStatus(req, res) {
  try {
    const id = req.params.id;
    const { feesPaid } = req.body;
    const student = await Student.findByIdAndUpdate(
      id,
      { feesPaid: feesPaid },
      { new: true }
    ).select("-password");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({
      message: "Fee status updated successfully",
      student: student,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update fee status",
    });
  }
}

export async function getStats(req, res) {
  try {
    const totalStudents = await Student.countDocuments({});
    const paidStudents = await Student.countDocuments({ feesPaid: true });
    const unpaidStudents = totalStudents - paidStudents;

    const stats = {
      totalStudents: totalStudents,
      paidStudents: paidStudents,
      unpaidStudents: unpaidStudents
    };

    res.json(stats);
  } catch (error) {
    console.log('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
}
