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

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
   useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      })
      if (response.ok) {
        const user = await response.json()
        setCurrentUser(user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }
  const handleLogin = (user)=>{
    setCurrentUser(user)
  }
  const handleLogOut = async () =>{
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      setCurrentUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={currentUser ? <Navigate to="/dashboard" replace/>:<LandingPage />}/>
        <Route path='/login' element={currentUser ? <Navigate to="/dashboard" replace/>:<LoginPage onLogin={handleLogin} />}/>
        <Route
        path='/dashboard'
        element={
          <ProtectedRoute user={currentUser}>
            <NavBar user={currentUser} onLogout={handleLogOut}/>
            <Dashboard />
          </ProtectedRoute>
        }
        />
        <Route
        path='/profile'
        element={
          <ProtectedRoute user={currentUser}>
           <NavBar user={currentUser} onLogout={handleLogOut}/>
            <ProfilePage user={currentUser} onUpdate={checkAuthStatus}/>
          </ProtectedRoute>
        }
        />
         <Route
          path="/payment"
          element={
            <ProtectedRoute user={currentUser}>
              <PaymentPage user={currentUser} onSuccess={checkAuthStatus} />
            </ProtectedRoute>
          }
        />
        

        
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </div>
  )
}

export default App
