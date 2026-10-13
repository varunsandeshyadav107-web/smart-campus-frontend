import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { subscribeBackendStatus, pingBackend } from '../services/api.js'
import { IconMenu, IconSun, IconMoon, IconRefresh, IconPlus } from './Icons.jsx'

export default function Navbar({ onOpenSidebar }) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isBackendUp, setIsBackendUp] = useState(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const unsub = subscribeBackendStatus((status) => {
      setIsBackendUp(status)
    })
    return unsub
  }, [])

  async function handleCheckConnection() {
    setChecking(true)
    await pingBackend()
    setTimeout(() => setChecking(false), 500)
  }

  // Get current section label
  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'Campus Dashboard'
    if (path.startsWith('/students/new')) return 'Register Student'
    if (path.includes('/edit')) return 'Edit Profile'
    if (path.startsWith('/students')) return 'Student Directory'
    if (path.startsWith('/faculty')) return 'Faculty Registry'
    if (path.startsWith('/courses')) return 'Academic Catalog'
    return 'Campus Administration'
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="btn-icon menu-btn"
          aria-label="Open menu"
          onClick={onOpenSidebar}
        >
          <IconMenu size={20} />
        </button>
        <div className="topbar-title-wrap">
          <h2 className="topbar-title">{getPageTitle()}</h2>
          <span className="topbar-subtitle">Smart Campus Management</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Backend & Aiven Status Badge */}
        <div
          className={`status-pill ${
            isBackendUp === true
              ? 'status-online'
              : isBackendUp === false
              ? 'status-offline'
              : 'status-checking'
          }`}
          title={
            isBackendUp
              ? 'Connected to Spring Boot REST API & Aiven Database'
              : 'Spring Boot is offline. Operating in Local Demo Storage mode.'
          }
        >
          <span className="status-dot" />
          <span className="status-text">
            {isBackendUp === true
              ? 'Spring Boot + Aiven Live'
              : isBackendUp === false
              ? 'Local Storage (Demo Mode)'
              : 'Connecting...'}
          </span>
          <button
            className={`btn-icon btn-recheck ${checking ? 'spin' : ''}`}
            onClick={handleCheckConnection}
            title="Check connection again"
            aria-label="Refresh connection"
          >
            <IconRefresh size={14} />
          </button>
        </div>

        {/* Quick Add Button */}
        <Link to="/students/new" className="btn btn-primary btn-sm quick-add-btn">
          <IconPlus size={15} />
          <span>Add Student</span>
        </Link>

        {/* Theme Toggle */}
        <button
          className="btn-icon theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <IconSun size={19} /> : <IconMoon size={19} />}
        </button>

        {/* User Profile & Logout */}
        {user ? (
          <div className="user-profile-menu">
            <div className="admin-badge">
              <div className="admin-avatar">{user.fullName ? user.fullName[0] : 'U'}</div>
              <div className="admin-info">
                <span className="admin-name">{user.fullName || user.username}</span>
                <span className="admin-role">{user.role || 'Member'}</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="btn btn-sm btn-danger-soft logout-btn"
              title="Sign out of portal"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}
