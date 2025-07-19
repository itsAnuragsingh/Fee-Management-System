"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, ArrowLeft, CheckCircle, Lock, Calendar, UserIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

export default function PaymentPage({ user, onSuccess }) {
  const navigate = useNavigate()
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    amount: "5000",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    let value = e.target.value
    // Format card number
    if (e.target.name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (value.length > 19) return
    }
    // Limit CVV to 3 digits
    if (e.target.name === "cvv" && value.length > 3) return
    setPaymentData({
      ...paymentData,
      [e.target.name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setPaymentData({
      ...paymentData,
      [name]: value,
    })
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setStep(2)
    try {
      const response = await fetch("http://localhost:3000/api/payments/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: paymentData.amount,
          cardholderName: paymentData.cardholderName,
          cardNumber: paymentData.cardNumber,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setStep(3)
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
          navigate("/profile")
        }, 3000)
      } else {
        setError(data.error || "Payment failed")
        setStep(1)
      }
    } catch (error) {
      setError("Network error. Please try again.")
      setStep(1)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-blur overflow-hidden max-w-md w-full"
        >
          <div className="text-center py-12 px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-green-700 mb-3"
            >
              Payment Successful!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6"
            >
              Your fees have been paid successfully.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center space-x-2 text-sm text-gray-500"
            >
              <LoadingSpinner size="sm" />
              <span>Redirecting to profile...</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </motion.button>
        </motion.div>
        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: step >= stepNumber ? "#4f46e5" : "#e5e7eb",
                    color: step >= stepNumber ? "#ffffff" : "#6b7280",
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                >
                  {stepNumber}
                </motion.div>
                {stepNumber < 3 && (
                  <motion.div
                    animate={{
                      backgroundColor: step > stepNumber ? "#4f46e5" : "#e5e7eb",
                    }}
                    className="w-16 h-1 mx-2"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              {step === 1 && "Payment Details"}
              {step === 2 && "Processing..."}
              {step === 3 && "Success!"}
            </span>
          </div>
        </motion.div>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card-blur overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <CreditCard className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Payment Details</h2>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Payment Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                  >
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                      <UserIcon className="w-5 h-5" />
                      <span>Payment Summary</span>
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Student Fees</span>
                        <span className="font-bold text-2xl text-indigo-600">₹{paymentData.amount}</span>
                      </div>
                      <div className="text-sm text-gray-500 pt-2 border-t border-gray-200">
                        Student: {user.name} ({user.email})
                      </div>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                      >
                        <span>⚠️</span>
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Card Details */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Card Information</span>
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        name="cardholderName"
                        value={paymentData.cardholderName}
                        onChange={handleChange}
                        placeholder="Enter cardholder name"
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="input-field font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Month
                        </label>
                        <select
                          value={paymentData.expiryMonth}
                          onChange={(e) => handleSelectChange("expiryMonth", e.target.value)}
                          required
                          className="input-field"
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                              {String(i + 1).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <select
                          value={paymentData.expiryYear}
                          onChange={(e) => handleSelectChange("expiryYear", e.target.value)}
                          required
                          className="input-field"
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={2024 + i} value={String(2024 + i)}>
                              {2024 + i}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          required
                          className="input-field font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg text-lg"
                    >
                      Pay Now - ₹{paymentData.amount}
                    </motion.button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>This is a simulation. No real payment will be processed.</span>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-blur overflow-hidden"
            >
              <div className="text-center py-16 px-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h3>
                <p className="text-gray-600">Please wait while we process your payment...</p>
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    🔒 Your payment is being securely processed. Do not refresh or close this page.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
