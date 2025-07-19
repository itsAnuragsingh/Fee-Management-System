import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Navigate, Route, Routes} from 'react-router'
import LandingPage from './pages/LandinPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'
import ProfilePage from './pages/ProfilePage'
import PaymentPage from './pages/PaymentPage'
import LoadingSpinner from './components/LoadingSpinner'
import { authenticatedFetch, removeAuthToken } from './utils/auth'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
   useEffect(() => {
    
    if (!isLoggingOut) {
      checkAuthStatus()
    }
  }, [isLoggingOut])

  const checkAuthStatus = async () => {
    try {
      const response = await authenticatedFetch("https://fee-management-system-52mr.onrender.com/api/auth/me")
      if (response.ok) {
        const user = await response.json()
        setCurrentUser(user)
      }else {
        setCurrentUser(null)
        // Clear any stored tokens if auth check fails
        removeAuthToken()
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setCurrentUser(null)
      removeAuthToken()
    } finally {
      setLoading(false)
    }
  }
  const handleLogin = (user)=>{
    setCurrentUser(user)
    setIsLoggingOut(false)
  }
   const handleLogOut = async () => {
    setIsLoggingOut(true)
    
    try {
      const response = await authenticatedFetch("https://fee-management-system-52mr.onrender.com/api/auth/logout", {
        method: "POST",
      })

      setCurrentUser(null)
      removeAuthToken()

      setTimeout(() => {
        setIsLoggingOut(false)
      }, 100)
      
    } catch (error) {
      console.error("Logout failed:", error)

      setCurrentUser(null)
      removeAuthToken()
      setTimeout(() => {
        setIsLoggingOut(false)
      }, 100)
    }
  }
   if (loading && !isLoggingOut) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route 
          path='/' 
          element={currentUser && !isLoggingOut ? <Navigate to="/dashboard" replace/> : <LandingPage />}
        />
        <Route 
          path='/login' 
          element={currentUser && !isLoggingOut ? <Navigate to="/dashboard" replace/> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute user={currentUser} isLoggingOut={isLoggingOut}>
              <NavBar user={currentUser} onLogout={handleLogOut}/>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute user={currentUser} isLoggingOut={isLoggingOut}>
             <NavBar user={currentUser} onLogout={handleLogOut}/>
              <ProfilePage user={currentUser} onUpdate={checkAuthStatus}/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/payment"
          element={
            <ProtectedRoute user={currentUser} isLoggingOut={isLoggingOut}>
              <PaymentPage user={currentUser} onSuccess={checkAuthStatus} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
