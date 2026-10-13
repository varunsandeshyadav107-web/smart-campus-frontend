import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getStudent, deleteStudent } from '../services/studentService.js'
import { getErrorInfo } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'
import Loader from '../components/Loader.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconMail,
  IconPhone,
  IconBuilding,
  IconStudents,
} from '../components/Icons.jsx'
import { getDepartmentColorClass, getInitials } from '../components/StudentTable.jsx'

export default function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getStudent(id)
      .then(setStudent)
      .catch((e) => toast.error(getErrorInfo(e).message))
      .finally(() => setLoading(false))
  }, [id, toast])

  async function handleDelete() {
    setDeleting(true)
    try {
      await deleteStudent(id)
      toast.success(`${student.fullName} was removed.`)
      navigate('/students')
    } catch (e) {
      toast.error(getErrorInfo(e).message)
      setShowDelete(false)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="page-container details-page-container">
      <div className="details-header-row">
        <Link to="/students" className="back-link">
          <IconArrowLeft size={16} />
          <span>Back to Students</span>
        </Link>
        {student && (
          <div className="details-actions">
            <Link to={`/students/${student.id}/edit`} className="btn btn-secondary">
              <IconEdit size={16} />
              <span>Edit Record</span>
            </Link>
            <button onClick={() => setShowDelete(true)} className="btn btn-danger-soft">
              <IconTrash size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <Loader text="Loading student file..." />
      ) : student ? (
        <div className="profile-detail-card">
          {/* Profile Hero Header */}
          <div className="profile-hero">
            <div className={`profile-avatar-large ${getDepartmentColorClass(student.department)}`}>
              {getInitials(student.fullName)}
            </div>
            <div className="profile-hero-meta">
              <h1 className="profile-hero-name">{student.fullName}</h1>
              <div className="profile-hero-tags">
                <span className="code-pill font-mono">{student.rollNumber}</span>
                <span className={`dept-badge ${getDepartmentColorClass(student.department)}`}>
                  {student.department} Department
                </span>
                <span className="year-pill">Class Year {student.yearOfStudy}</span>
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="profile-grid">
            <div className="profile-section-card">
              <div className="section-card-title">
                <IconBuilding size={18} />
                <span>Academic Affiliation</span>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-key">Roll / Reg Number:</span>
                  <span className="info-val font-mono">{student.rollNumber}</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Department:</span>
                  <span className="info-val">{student.department} Engineering</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Year of Study:</span>
                  <span className="info-val">Year {student.yearOfStudy} (Semester {(student.yearOfStudy * 2) - 1} / {student.yearOfStudy * 2})</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Enrollment Status:</span>
                  <span className="status-chip-active">Active Matriculated</span>
                </div>
              </div>
            </div>

            <div className="profile-section-card">
              <div className="section-card-title">
                <IconStudents size={18} />
                <span>Contact & Communication</span>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-key">Campus Email:</span>
                  <a href={`mailto:${student.email}`} className="info-link">
                    <IconMail size={14} />
                    <span>{student.email}</span>
                  </a>
                </div>
                <div className="info-row">
                  <span className="info-key">Primary Phone:</span>
                  <a href={`tel:${student.phoneNumber}`} className="info-link">
                    <IconPhone size={14} />
                    <span>{student.phoneNumber}</span>
                  </a>
                </div>
                <div className="info-row">
                  <span className="info-key">Database Record ID:</span>
                  <span className="info-val font-mono">#{student.id}</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Storage Node:</span>
                  <span className="info-val">Spring Boot • Aiven MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-card">Student record not found.</div>
      )}

      {showDelete && student && (
        <ConfirmDialog
          title="Delete Student Record"
          message={`Are you sure you want to permanently delete ${student.fullName} (${student.rollNumber})?`}
          busy={deleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  )
}
