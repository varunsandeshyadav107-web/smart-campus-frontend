import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

// Announcement ticker data
const ANNOUNCEMENTS = [
  "📢 Admission 2024-25: Online applications open for B.Tech / M.Tech programmes",
  "🏆 Institutional Excellence: Ranked #12 in NIRF Engineering Rankings 2024 — Congratulations!",
  "📅 End Semester Examinations: Schedule published on the academic portal",
  "🎓 Convocation Ceremony 2024 — 17th November, 10:00 AM, Main Auditorium",
  "🔬 Research Grant: ₹2.4 Crore sanctioned by DST for AI & Robotics Lab",
  "📋 Fee Payment Portal: Last date for semester fee payment is 31st October",
  "🌐 International Collaboration: MoU signed with University of Stuttgart, Germany",
]

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [tickerIdx, setTickerIdx] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Announcement ticker
  useEffect(() => {
    const t = setInterval(() => {
      setTickerIdx(i => (i + 1) % ANNOUNCEMENTS.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) {
      setError('Please enter your Campus ID and Password.')
      return
    }
    setLoading(true)
    try {
      await login(username, password)
      toast.success('Welcome to Smart Campus Portal!')
      navigate('/')
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const timeStr = currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = currentTime.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="clg-login-root">

      {/* ── TOP HEADER BAR ── */}
      <div className="clg-topbar">
        <div className="clg-topbar-inner">
          <div className="clg-topbar-left">
            <span>📞 Helpdesk: 1800-XXX-XXXX</span>
            <span className="clg-sep">|</span>
            <span>✉ info@smartcampus.edu.in</span>
            <span className="clg-sep">|</span>
            <span>🌐 www.smartcampus.edu.in</span>
          </div>
          <div className="clg-topbar-right">
            <span className="clg-live-clock">🕐 {timeStr}</span>
            <span className="clg-sep">|</span>
            <span>{dateStr}</span>
          </div>
        </div>
      </div>

      {/* ── COLLEGE HEADER ── */}
      <header className="clg-header">
        <div className="clg-header-inner">
          {/* Emblem */}
          <div className="clg-emblem">
            <div className="clg-emblem-circle">
              <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="#c8a227" strokeWidth="2.5" fill="none"/>
                <path d="M30 10 L50 22 L50 40 L30 52 L10 40 L10 22 Z" stroke="#c8a227" strokeWidth="1.5" fill="rgba(200,162,39,0.08)"/>
                <path d="M20 28 L30 14 L40 28 L40 44 L20 44 Z" fill="#1a3a6b" opacity="0.9"/>
                <path d="M20 28 L40 28" stroke="#c8a227" strokeWidth="1.5"/>
                <circle cx="30" cy="35" r="5" fill="#c8a227" opacity="0.8"/>
                <path d="M22 44 L38 44" stroke="#c8a227" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* College Name */}
          <div className="clg-name-block">
            <div className="clg-name-hindi">स्मार्ट कैम्पस प्रबंधन प्रणाली</div>
            <h1 className="clg-name-english">Smart Campus Management</h1>
            <p className="clg-name-subtitle">Integrated Academic Administration & Governance Portal</p>
            <p className="clg-name-estd">
              <span className="clg-estd-badge">Estd. 1959</span>
              <span className="clg-sep">•</span>
              <span>Higher Education Administration • Academic ERP</span>
              <span className="clg-sep">•</span>
              <span>NAAC Grade 'A++' Accredited</span>
            </p>
          </div>

          {/* Right Logo */}
          <div className="clg-header-badges">
            <div className="clg-badge-box">NAAC<br/><strong>A++</strong></div>
            <div className="clg-badge-box">NIRF<br/><strong>#12</strong></div>
            <div className="clg-badge-box">NBA<br/><strong>Accrd.</strong></div>
          </div>
        </div>
      </header>

      {/* ── NAV BAR ── */}
      <nav className="clg-nav">
        <div className="clg-nav-inner">
          {['Home','About','Academics','Admissions','Research','Faculty','Students','Contact'].map(item => (
            <a key={item} href="#" className="clg-nav-link">{item}</a>
          ))}
        </div>
      </nav>

      {/* ── ANNOUNCEMENT TICKER ── */}
      <div className="clg-ticker-bar">
        <span className="clg-ticker-label">📢 NOTICE</span>
        <div className="clg-ticker-content">
          <span className="clg-ticker-text" key={tickerIdx}>
            {ANNOUNCEMENTS[tickerIdx]}
          </span>
        </div>
      </div>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <main className="clg-main">

        {/* LEFT — Campus Photo + Stats */}
        <div className="clg-left-panel">
        <div className="clg-campus-photo-wrap">
            <img
              src="/campus.jpg"
              alt="Campus Building"
              className="clg-campus-img"
              onError={e => {
                e.target.style.display='none'
              }}
            />
            <div className="clg-campus-bg-fallback">
              <div className="clg-campus-overlay-content">
                <div className="clg-campus-icon">
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="rgba(200,162,39,0.9)" strokeWidth="1.2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <h2 className="clg-campus-title">Smart Campus Management</h2>
                <p className="clg-campus-sub">Central Administrative Complex & Senate Hall</p>
                <div className="clg-campus-flags">
                  <div className="clg-mini-flag"/>
                </div>
              </div>
            </div>
            <div className="clg-photo-overlay">
              <p className="clg-photo-caption">🏛️ Central Administration Block — Smart Campus Management</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="clg-stats-strip">
            <div className="clg-stat-item">
              <span className="clg-stat-num">6,200+</span>
              <span className="clg-stat-lbl">Students</span>
            </div>
            <div className="clg-stat-div"/>
            <div className="clg-stat-item">
              <span className="clg-stat-num">380+</span>
              <span className="clg-stat-lbl">Faculty</span>
            </div>
            <div className="clg-stat-div"/>
            <div className="clg-stat-item">
              <span className="clg-stat-num">120+</span>
              <span className="clg-stat-lbl">Courses</span>
            </div>
            <div className="clg-stat-div"/>
            <div className="clg-stat-item">
              <span className="clg-stat-num">65+</span>
              <span className="clg-stat-lbl">Years</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="clg-quicklinks">
            <h3 className="clg-ql-title">🔗 Quick Links</h3>
            <div className="clg-ql-grid">
              {[
                { icon: '📄', label: 'Academic Calendar' },
                { icon: '💰', label: 'Fee Payment Portal' },
                { icon: '📚', label: 'Digital Library' },
                { icon: '🏠', label: 'Hostel Management' },
                { icon: '📊', label: 'Exam Results' },
                { icon: '🚌', label: 'Transport Schedule' },
              ].map(link => (
                <a key={link.label} href="#" className="clg-ql-item">
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Login Form */}
        <div className="clg-right-panel">
          <div className="clg-login-card">

            {/* Card Header */}
            <div className="clg-card-header">
              <div className="clg-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <h2 className="clg-card-title">Campus Portal Login</h2>
                <p className="clg-card-subtitle">Academic Management System — 2024–25</p>
              </div>
            </div>

            <div className="clg-card-divider"/>

            {/* Portal Tabs */}
            <div className="clg-portal-tabs">
              <button className="clg-tab active">🎓 Student / Faculty</button>
              <button className="clg-tab">🏛️ Administration</button>
            </div>

            {/* Error */}
            {error && (
              <div className="clg-error-box">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="clg-form">
              <div className="clg-field">
                <label htmlFor="clg-username">Campus ID / Employee Number</label>
                <div className="clg-input-wrap">
                  <span className="clg-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    id="clg-username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="clg-input"
                    placeholder="e.g.  admin  or  22CSE101"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="clg-field">
                <label htmlFor="clg-password">
                  Password
                  <a href="#" className="clg-forgot">Forgot Password?</a>
                </label>
                <div className="clg-input-wrap">
                  <span className="clg-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="clg-password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="clg-input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="clg-show-pass"
                    onClick={() => setShowPass(v => !v)}
                    tabIndex={-1}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="clg-remember-row">
                <label className="clg-check-label">
                  <input type="checkbox" className="clg-checkbox" />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="clg-login-btn"
                disabled={loading}
              >
                {loading ? (
                  <><span className="clg-btn-spinner"/> Authenticating...</>
                ) : (
                  <>🔐 Sign In to Campus Portal</>
                )}
              </button>
            </form>

            {/* Demo Credentials Box */}
            <div className="clg-demo-box">
              <p className="clg-demo-title">🧪 Quick Evaluation Access (1-Click Fill):</p>
              <div className="clg-demo-row">
                <button
                  className="clg-demo-btn"
                  type="button"
                  onClick={() => { setUsername('admin'); setPassword('admin123') }}
                  title="Registrar / Administrative Access"
                >
                  <strong>👑 Administrator</strong>
                  <span>admin / admin123</span>
                </button>
                <button
                  className="clg-demo-btn"
                  type="button"
                  onClick={() => { setUsername('faculty'); setPassword('faculty123') }}
                  title="Faculty Member Access"
                >
                  <strong>👨‍🏫 Faculty</strong>
                  <span>faculty / faculty123</span>
                </button>
                <button
                  className="clg-demo-btn"
                  type="button"
                  onClick={() => { setUsername('student'); setPassword('student123') }}
                  title="Student Access"
                >
                  <strong>🎓 Student</strong>
                  <span>student / student123</span>
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="clg-security-notice">
              <span>🔒</span>
              <span>This is a secure, authorized portal. Unauthorized access is prohibited under the IT Act, 2000.</span>
            </div>
          </div>

          {/* Help Links */}
          <div className="clg-help-links">
            <a href="#">New User Registration</a>
            <span>|</span>
            <a href="#">Reset Password</a>
            <span>|</span>
            <a href="#">IT Helpdesk</a>
            <span>|</span>
            <a href="#">Student Grievance</a>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="clg-footer">
        <div className="clg-footer-inner">
          <p>© 2024 Smart Campus Management System. All Rights Reserved.</p>
          <p>Enterprise Higher Education Administration | Architecture: React 18 + Spring Boot 3 + Aiven MySQL</p>
        </div>
      </footer>
    </div>
  )
}
