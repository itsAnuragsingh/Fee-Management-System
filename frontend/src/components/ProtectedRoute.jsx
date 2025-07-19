import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children, user,isLoggingOut}) => {
    if (!user || isLoggingOut) {
        return <Navigate to="/login" replace/>
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute