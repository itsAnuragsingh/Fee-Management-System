import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { User } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
const Dashboard = () => {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchStudents()
    }, [])
    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/students", {
                credentials: "include"
            })
            const data = await response.json()
            setStudents(data)

        } catch (error) {
            console.error("Error fetching students:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className='card-blur overflow-hidden'>
                    <div className='bg-gradient-to-r from-indigo-600 bg-purple-600 p-6'>
                        <div className='flex items-center space-x-3 text-white'>
                            <User className='w-6 h-6' />
                            <h2 className='font-bold text-2xl'>All Students</h2>
                        </div>
                    </div>
                </div>
                <div className='p-6  rounded-2xl mt-4 card-blur'>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b border-gray-200'>
                                        <th className='text-left  px-4 py-4 font-semibold text-gray-700'>Roll No</th>
                                        <th className='text-left  px-4 py-4 font-semibold text-gray-700'>Name</th>
                                        <th className='text-left  px-4 py-4 font-semibold text-gray-700'>Email</th>
                                        <th className='text-left  px-4 py-4 font-semibold text-gray-700'>Course</th>

                                        <th className='text-left  px-4 py-4 font-semibold text-gray-700'>Fees Paid Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <motion.tr key={student._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                                            <td className="py-4 px-4 font-mono text-sm font-medium text-indigo-600">{student.rollNo}</td>
                                            <td  className="py-4 px-4 font-medium text-gray-900">{student.name}</td>
                                            <td className="py-4 px-4 text-gray-600">{student.email}</td>
                                            <td className="py-4 px-4 text-gray-600">{student.course || "N/A"}</td>
                                            <td>
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.2 }}
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${student.feesPaid
                                                        ? "bg-green-100 text-green-800 border border-green-200"
                                                        : "bg-red-100 text-red-800 border border-red-200"
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-2 h-2 rounded-full mr-2 ${student.feesPaid ? "bg-green-500" : "bg-red-500"
                                                            }`}
                                                    ></div>
                                                    {student.feesPaid ? "Yes" : "No"}
                                                </motion.span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </motion.div>
        </main>
    )
}

export default Dashboard