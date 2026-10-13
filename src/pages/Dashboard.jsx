import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardStats, getStudents } from '../services/studentService.js'
import { getFacultyList } from '../services/facultyService.js'
import { getCourses } from '../services/courseService.js'
import { getErrorInfo, getBackendStatus } from '../services/api.js'
import { mockStore } from '../services/mockData.js'
import Loader from '../components/Loader.jsx'
import {
  IconStudents,
  IconFaculty,
  IconCourses,
  IconBuilding,
  IconPlus,
  IconDownload,
  IconTrendingUp,
} from '../components/Icons.jsx'
import { getDepartmentColorClass, getInitials } from '../components/StudentTable.jsx'

export default function Dashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, totalFaculty: 0, totalCourses: 0 })
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true)
        const [statsData, studentsData] = await Promise.all([
          getDashboardStats(),
          getStudents(),
        ])
        setStats(statsData)
        setStudents(studentsData)
      } catch (e) {
        setError(getErrorInfo(e).message)
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  // Calculate department distribution
  const deptCounts = students.reduce((acc, st) => {
    const d = st.department || 'Other'
    acc[d] = (acc[d] || 0) + 1
    return acc
  }, {})

  const totalStud = students.length || 1
  const sortedDepts = Object.entries(deptCounts).sort((a, b) => b[1] - a[1])

  // Year breakdown
  const yearCounts = [1, 2, 3, 4].map((yr) => ({
    year: yr,
    count: students.filter((s) => s.yearOfStudy === yr).length,
  }))

  const recentStudents = students.slice(0, 8)

  const downloadReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Count\n' +
      `Total Students,${stats.totalStudents}\n` +
      `Total Faculty,${stats.totalFaculty}\n` +
      `Total Courses,${stats.totalCourses}\n`

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'campusnexus_executive_summary.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function resetDemoData() {
    mockStore.resetDefaults()
    window.location.reload()
  }

  return (
    <div className="page-container dashboard-page">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-tag">
            <span className="welcome-dot" />
            <span>Academic Year 2024–2025</span>
          </div>
          <h1 className="welcome-title">Smart Campus Management</h1>
          <p className="welcome-sub">
            Real-time institutional metrics, departmental analytics, and academic governance registries powered by Spring Boot and Aiven Cloud MySQL.
          </p>
        </div>
        <div className="welcome-actions">
          <button onClick={resetDemoData} className="btn btn-secondary btn-icon-gap" title="Reload all demo data (clears local changes)">
            <span style={{fontSize:'16px'}}>🔄</span>
            <span>Reset Demo Data</span>
          </button>
          <button onClick={downloadReport} className="btn btn-secondary btn-icon-gap">
            <IconDownload size={16} />
            <span>Export Summary</span>
          </button>
          <Link to="/students/new" className="btn btn-primary btn-icon-gap">
            <IconPlus size={16} />
            <span>Enroll Student</span>
          </Link>
        </div>
      </section>

      {loading ? (
        <Loader text="Synthesizing campus analytics..." />
      ) : (
        <>
          {/* KPI Stat Cards */}
          <section className="kpi-grid">
            <div className="kpi-card kpi-students">
              <div className="kpi-header">
                <span className="kpi-label">Total Students</span>
                <span className="kpi-icon-wrap">
                  <IconStudents size={22} />
                </span>
              </div>
              <div className="kpi-metric">{stats.totalStudents}</div>
              <div className="kpi-footer">
                <span className="kpi-trend">
                  <IconTrendingUp size={14} /> Active matriculation
                </span>
                <Link to="/students" className="kpi-link">View Roster →</Link>
              </div>
            </div>

            <div className="kpi-card kpi-faculty">
              <div className="kpi-header">
                <span className="kpi-label">Faculty Members</span>
                <span className="kpi-icon-wrap">
                  <IconFaculty size={22} />
                </span>
              </div>
              <div className="kpi-metric">{stats.totalFaculty}</div>
              <div className="kpi-footer">
                <span className="kpi-trend">Full-time & Adjunct</span>
                <Link to="/faculty" className="kpi-link">Directory →</Link>
              </div>
            </div>

            <div className="kpi-card kpi-courses">
              <div className="kpi-header">
                <span className="kpi-label">Active Courses</span>
                <span className="kpi-icon-wrap">
                  <IconCourses size={22} />
                </span>
              </div>
              <div className="kpi-metric">{stats.totalCourses}</div>
              <div className="kpi-footer">
                <span className="kpi-trend">Undergrad & Postgrad</span>
                <Link to="/courses" className="kpi-link">Catalog →</Link>
              </div>
            </div>

            <div className="kpi-card kpi-depts">
              <div className="kpi-header">
                <span className="kpi-label">Academic Departments</span>
                <span className="kpi-icon-wrap">
                  <IconBuilding size={22} />
                </span>
              </div>
              <div className="kpi-metric">{Object.keys(deptCounts).length || 6}</div>
              <div className="kpi-footer">
                <span className="kpi-trend">Accredited Engineering</span>
                <span className="kpi-badge-live">Accredited</span>
              </div>
            </div>
          </section>

          {/* Analytics & Distribution Section */}
          <div className="dashboard-columns">
            {/* Department Breakdown */}
            <div className="glass-panel">
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">Department Enrollment Distribution</h3>
                  <p className="panel-subtitle">Share of enrolled students by academic division</p>
                </div>
              </div>

              <div className="dept-distribution-list">
                {sortedDepts.map(([dept, count]) => {
                  const percent = Math.round((count / totalStud) * 100)
                  return (
                    <div key={dept} className="dept-dist-row">
                      <div className="dept-dist-info">
                        <span className={`dept-badge ${getDepartmentColorClass(dept)}`}>
                          {dept}
                        </span>
                        <span className="dept-dist-count">{count} Students ({percent}%)</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${Math.max(percent, 8)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Year Breakdown Footer */}
              <div className="year-breakdown-row">
                <h4 className="year-breakdown-title">Class Year Distribution:</h4>
                <div className="year-chips">
                  {yearCounts.map((yc) => (
                    <div key={yc.year} className="year-chip">
                      <span className="year-chip-label">Yr {yc.year}:</span>
                      <span className="year-chip-val">{yc.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="glass-panel">
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">Recent Enrolments</h3>
                  <p className="panel-subtitle">Latest additions to the campus database</p>
                </div>
                <Link to="/students" className="btn btn-sm btn-secondary">All Students</Link>
              </div>

              <div className="recent-list">
                {recentStudents.length === 0 ? (
                  <p className="empty-sub">No recent enrolments found.</p>
                ) : (
                  recentStudents.map((st) => (
                    <div key={st.id} className="recent-item">
                      <div className={`student-avatar ${getDepartmentColorClass(st.department)}`}>
                        {getInitials(st.fullName)}
                      </div>
                      <div className="recent-info">
                        <Link to={`/students/${st.id}`} className="recent-name">
                          {st.fullName}
                        </Link>
                        <span className="recent-roll">{st.rollNumber} • {st.department}</span>
                      </div>
                      <span className="year-pill">Yr {st.yearOfStudy}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Actions Footer Box */}
              <div className="quick-nav-box">
                <h4 className="quick-nav-title">Quick Administration:</h4>
                <div className="quick-btn-group">
                  <Link to="/students/new" className="quick-btn">
                    <IconPlus size={14} /> Add Student
                  </Link>
                  <Link to="/faculty" className="quick-btn">
                    <IconPlus size={14} /> Add Faculty
                  </Link>
                  <Link to="/courses" className="quick-btn">
                    <IconPlus size={14} /> Add Course
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
