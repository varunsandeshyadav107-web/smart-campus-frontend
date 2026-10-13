import { NavLink } from 'react-router-dom'
import {
  IconDashboard,
  IconStudents,
  IconFaculty,
  IconCourses,
  IconPlus,
  IconClose,
} from './Icons.jsx'

export default function Sidebar({ open, onClose }) {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-item active' : 'nav-item'

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">Smart Campus</span>
              <span className="brand-subtitle">Management System</span>
            </div>
          </div>
          <button
            className="btn-icon mobile-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <IconClose size={20} />
          </button>
        </div>

        <div className="sidebar-section-title">MAIN NAVIGATION</div>

        <nav className="nav-menu" onClick={onClose}>
          <NavLink to="/" end className={linkClass}>
            <span className="nav-icon"><IconDashboard size={19} /></span>
            <span className="nav-label">Dashboard</span>
          </NavLink>

          <NavLink to="/students" end className={linkClass}>
            <span className="nav-icon"><IconStudents size={19} /></span>
            <span className="nav-label">Students</span>
          </NavLink>

          <NavLink to="/faculty" end className={linkClass}>
            <span className="nav-icon"><IconFaculty size={19} /></span>
            <span className="nav-label">Faculty</span>
          </NavLink>

          <NavLink to="/courses" end className={linkClass}>
            <span className="nav-icon"><IconCourses size={19} /></span>
            <span className="nav-label">Courses</span>
          </NavLink>
        </nav>

        <div className="sidebar-section-title">QUICK ACTIONS</div>
        <div className="sidebar-quick-actions" onClick={onClose}>
          <NavLink to="/students/new" className="quick-action-link">
            <IconPlus size={16} />
            <span>New Student</span>
          </NavLink>
        </div>

        <div className="sidebar-footer">
          <div className="system-pill">
            <div className="system-header">
              <span className="system-indicator" />
              <strong>Smart Campus v3.0</strong>
            </div>
            <p className="system-desc">
              React 18 • Spring Boot 3 • MySQL / Aiven
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
