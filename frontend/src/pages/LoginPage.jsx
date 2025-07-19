import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
const LoginPage = ({onLogin}) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    course: "",
    semester: "",
    year: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    setError("")
    try {
      const endpoint = isLogin ? "http://localhost:3000/api/auth/login":"http://localhost:3000/api/auth/register"

      const response = await fetch(endpoint,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if(response.ok){
        onLogin(data.user)
        navigate("/")
      }else {
        setError(data.error || "Authentication failed")
      }
      
    } catch (error) {
      setError("Network error. Please try again.")
    }finally{
      setLoading(false)
    }


  }
  return (
    <div className='min-h-screen gradient-bg flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='w-full max-w-md'
      >
        <div className='card-blur overflow-hidden'>
          <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6'>
            <div className='flex items-center justify-between text-white'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/")}
                className='hover:bg-white/20 rounded-lg p-2 transition-colors duration-200'
              >
                <ArrowLeft className='w-5 h-5' />
              </motion.button>
              <div className='flex items-center space-x-2'>
                {isLogin ? <LogIn className='w-6 h-6' /> : <UserPlus className='w-6 h-6' />}
                <h2 className='text-2xl font-bold'>{isLogin ? "Login" : "SignUp"}</h2>
              </div>
              <div className='w-9'></div>
            </div>
          </div>
          <div className='p-6'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <AnimatePresence mode='wait'>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className='block text-sm font-medium mb-2'>Full Name</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="input-field"
                    />
                  </motion.div>
                )}

              </AnimatePresence>
              <div>
                <label className='block text-sm font-medium mb-2'>Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="input-field"
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>Password</label>
                <div className='relative'>
                  <input 
                  name='password'
                  type={showPassword ? "text":"password"}
                  value={formData.password}
                  required
                  onChange={handleChange}
                  placeholder='Enter your password'
                  className='pr-12 input-field'
                   />
                  <motion.button
                  whileHover={{scale:1.1}}
                   whileTap={{scale:0.9}}
                   type='button'
                   onClick={()=>setShowPassword(!showPassword)}
                   className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                   >
                    {showPassword ? <EyeOff/>:<Eye/>}
                   </motion.button>
                </div>
              </div>
               <AnimatePresence mode="wait">
                {!isLogin && (
                  <>
                    <motion.div
                      key="phone-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="input-field"
                      />
                    </motion.div>
                    <motion.div
                      key="course-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                      <input
                        name="course"
                        type="text"
                        value={formData.course}
                        onChange={handleChange}
                        placeholder="Enter your course"
                        className="input-field"
                      />
                    </motion.div>
                    <motion.div
                      key="additional-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleChange}
                          className="input-field"
                        >
                          <option value="">Select</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <option key={sem} value={sem}>
                              {sem}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <select name="year" value={formData.year} onChange={handleChange} className="input-field">
                          <option value="">Select</option>
                          {[2024, 2025, 2026, 2027].map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
               <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button 
              type='submit'
               whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
              className='w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
              >
                {loading ? (
                 <>
                  <LoadingSpinner size='sm'/>
                  <span>Please wait...</span>
                 </>
                ):(
                  <span>{isLogin ? "Login" : "Sign Up"}</span>
                )}
              </motion.button>
            </form>
            <div className='text-center mt-6'>
              <motion.button
               whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                  setFormData({ email: "", password: "", name: "", phone: "", course: "", semester: "", year: "" })
                }}
                className='text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200'
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </motion.button>
            </div>
            {isLogin && <motion.div 
            initial={{opacity:0, scale:0}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.3}}
            className='bg-cyan-200 p-5 rounded-lg mt-4 flex justify-center items-center flex-col'>
              <span className='font-mono'>demo email: anurag@example.com</span>
              <span className='font-mono'>demo password: anurag@123</span>
            </motion.div>}
          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default LoginPage