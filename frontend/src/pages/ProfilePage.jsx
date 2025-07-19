
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, CreditCard, Edit, Save, X, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { authenticatedFetch } from "../utils/auth"

export default function ProfilePage({ user, onUpdate }) {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    course: user.course || "",
    semester: user.semester || "",
    year: user.year || "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleEdit = () => {
    setIsEditing(true)
    setMessage("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      course: user.course || "",
      semester: user.semester || "",
      year: user.year || "",
    })
    setMessage("")
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage("")
    try {
      const response = await authenticatedFetch("https://fee-management-system-52mr.onrender.com/api/auth/update-profile", {
        method: "PUT",
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        setMessage("Profile updated successfully!")
        setIsEditing(false)
        onUpdate()
      } else {
        setMessage(data.error || "Update failed")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePayFees = () => {
    navigate("/payment")
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Profile Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-blur overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  <p className="text-indigo-100 text-sm">Roll No: {user.rollNo}</p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {!isEditing && (
                  <motion.button
                    key="edit-button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg border ${
                    message.includes("successfully")
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="name-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="input-field"
                    />
                  ) : (
                    <motion.div
                      key="name-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-gray-50/80 rounded-lg font-medium text-gray-900"
                    >
                      {user.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="email-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="input-field"
                    />
                  ) : (
                    <motion.div
                      key="email-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-gray-50/80 rounded-lg font-medium text-gray-900"
                    >
                      {user.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="phone-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="input-field"
                    />
                  ) : (
                    <motion.div
                      key="phone-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-gray-50/80 rounded-lg font-medium text-gray-900"
                    >
                      {user.phone || "Not provided"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="course-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      placeholder="Enter your course"
                      className="input-field"
                    />
                  ) : (
                    <motion.div
                      key="course-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-gray-50/80 rounded-lg font-medium text-gray-900"
                    >
                      {user.course || "Not provided"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.select
                      key="semester-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select Semester</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <motion.div
                      key="semester-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-gray-50/80 rounded-lg font-medium text-gray-900"
                    >
                      {user.semester ? `Semester ${user.semester}` : "Not provided"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.select
                      key="year-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select Year</option>
                      {[2024, 2025, 2026, 2027].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <motion.div
                      key="year-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-gray-50/80 rounded-lg font-medium text-gray-900"
                    >
                      {user.year || "Not provided"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex space-x-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-6 py-3 btn-secondary"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Fee Payment Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-blur overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
            <div className="flex items-center space-x-3 text-white">
              <CreditCard className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Fee Payment Status</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-3">Current Status:</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border-2 ${
                    user.feesPaid
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mr-2 ${user.feesPaid ? "bg-green-500" : "bg-red-500"}`}></div>
                  {user.feesPaid ? "Fees Paid" : "Fees Not Paid"}
                </motion.div>
                {user.feesPaid && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center space-x-2 text-green-600 mt-3"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Your fees have been successfully paid</span>
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {!user.feesPaid && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePayFees}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Pay Fees</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {!user.feesPaid && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
                >
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Notice:</strong> Your fees are currently unpaid. Please click the "Pay Fees" button to
                    complete your payment and avoid any academic restrictions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
