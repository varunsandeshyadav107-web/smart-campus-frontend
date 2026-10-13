import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api.js'

const AuthContext = createContext()

const DEFAULT_ADMIN = {
  username: 'admin',
  fullName: 'Dr. A. Sharma (Registrar)',
  role: 'Administrator',
  department: 'Office of Academic Affairs',
  email: 'registrar@smartcampus.edu',
}

const DEFAULT_FACULTY = {
  username: 'faculty',
  fullName: 'Prof. K. Ramanujan',
  role: 'Faculty Member',
  department: 'Computer Science & Engineering',
  email: 'k.ramanujan@smartcampus.edu',
}

const DEFAULT_STUDENT = {
  username: 'student',
  fullName: 'Aarav Sharma (Student)',
  role: 'Student',
  department: 'Computer Science & Engineering',
  email: 'aarav.sharma@smartcampus.edu',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sc_auth_user')
      if (saved) return JSON.parse(saved)
      return null // Shows realistic college portal login first
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sc_auth_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('sc_auth_user')
      }
    } catch (e) {
      // ignore
    }
  }, [user])

  async function login(username, password) {
    try {
      // 1. Try real Spring Boot API login
      const res = await api.post('/auth/login', { username, password })
      setUser(res.data)
      return { success: true, user: res.data }
    } catch (err) {
      // 2. Resilient demo fallback
      const u = (username || '').toLowerCase().trim()
      const p = (password || '').trim()

      if (u === 'admin' && p === 'admin123') {
        setUser(DEFAULT_ADMIN)
        return { success: true, user: DEFAULT_ADMIN }
      }
      if (u === 'faculty' && p === 'faculty123') {
        setUser(DEFAULT_FACULTY)
        return { success: true, user: DEFAULT_FACULTY }
      }
      if (u === 'student' && p === 'student123') {
        setUser(DEFAULT_STUDENT)
        return { success: true, user: DEFAULT_STUDENT }
      }

      throw new Error('Invalid Campus ID or Password. Try "admin" / "admin123" or "faculty" / "faculty123".')
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
