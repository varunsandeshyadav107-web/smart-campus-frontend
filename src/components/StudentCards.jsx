import { Link } from 'react-router-dom'
import { IconEye, IconEdit, IconTrash, IconMail, IconPhone } from './Icons.jsx'
import { getDepartmentColorClass, getInitials } from './StudentTable.jsx'

export default function StudentCards({ students, onDelete }) {
  return (
    <div className="cards-grid">
      {students.map((student) => (
        <div key={student.id} className="student-profile-card">
          <div className="card-top">
            <div className={`card-avatar ${getDepartmentColorClass(student.department)}`}>
              {getInitials(student.fullName)}
            </div>
            <div className="card-badge-row">
              <span className={`dept-badge ${getDepartmentColorClass(student.department)}`}>
                {student.department}
              </span>
              <span className="year-pill">Year {student.yearOfStudy}</span>
            </div>
          </div>

          <div className="card-info">
            <Link to={`/students/${student.id}`} className="card-name">
              {student.fullName}
            </Link>
            <span className="card-roll">{student.rollNumber}</span>
          </div>

          <div className="card-details-list">
            <div className="card-detail-item">
              <IconMail size={14} className="detail-icon" />
              <span className="detail-val" title={student.email}>{student.email}</span>
            </div>
            <div className="card-detail-item">
              <IconPhone size={14} className="detail-icon" />
              <span className="detail-val">{student.phoneNumber}</span>
            </div>
          </div>

          <div className="card-footer-actions">
            <Link to={`/students/${student.id}`} className="btn btn-sm btn-secondary">
              <IconEye size={14} />
              <span>Details</span>
            </Link>
            <Link to={`/students/${student.id}/edit`} className="btn btn-sm btn-secondary">
              <IconEdit size={14} />
              <span>Edit</span>
            </Link>
            <button
              onClick={() => onDelete(student)}
              className="btn btn-sm btn-danger-soft"
              aria-label={`Delete ${student.fullName}`}
            >
              <IconTrash size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
