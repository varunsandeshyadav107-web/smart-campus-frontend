import { Link } from 'react-router-dom'
import { IconEye, IconEdit, IconTrash } from './Icons.jsx'

export function getDepartmentColorClass(dept) {
  if (!dept) return 'badge-dept-default'
  const d = dept.toUpperCase()
  if (d.includes('CSE') || d.includes('COMPUTER')) return 'badge-dept-cse'
  if (d.includes('ECE') || d.includes('ELECTRONIC')) return 'badge-dept-ece'
  if (d.includes('EEE') || d.includes('ELECTRICAL')) return 'badge-dept-eee'
  if (d.includes('IT') || d.includes('INFORMATION')) return 'badge-dept-it'
  if (d.includes('MECH')) return 'badge-dept-mech'
  if (d.includes('CIVIL')) return 'badge-dept-civil'
  return 'badge-dept-default'
}

export function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0].slice(0, 2).toUpperCase()
}

export default function StudentTable({ students, onDelete }) {
  return (
    <div className="table-responsive-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Year of Study</th>
            <th>Contact</th>
            <th className="th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="table-row-hover">
              <td data-label="Student">
                <div className="student-cell">
                  <div className={`student-avatar ${getDepartmentColorClass(student.department)}`}>
                    {getInitials(student.fullName)}
                  </div>
                  <div className="student-meta">
                    <Link to={`/students/${student.id}`} className="student-name-link">
                      {student.fullName}
                    </Link>
                    <span className="student-email-sub">{student.email}</span>
                  </div>
                </div>
              </td>

              <td data-label="Roll Number">
                <span className="code-pill">{student.rollNumber}</span>
              </td>

              <td data-label="Department">
                <span className={`dept-badge ${getDepartmentColorClass(student.department)}`}>
                  {student.department}
                </span>
              </td>

              <td data-label="Year of Study">
                <span className="year-pill">Year {student.yearOfStudy}</span>
              </td>

              <td data-label="Contact">
                <span className="phone-text">{student.phoneNumber}</span>
              </td>

              <td data-label="Actions" className="td-actions">
                <div className="action-button-group">
                  <Link
                    to={`/students/${student.id}`}
                    className="action-btn action-view"
                    title="View details"
                    aria-label={`View ${student.fullName}`}
                  >
                    <IconEye size={16} />
                  </Link>
                  <Link
                    to={`/students/${student.id}/edit`}
                    className="action-btn action-edit"
                    title="Edit record"
                    aria-label={`Edit ${student.fullName}`}
                  >
                    <IconEdit size={16} />
                  </Link>
                  <button
                    onClick={() => onDelete(student)}
                    className="action-btn action-delete"
                    title="Delete record"
                    aria-label={`Delete ${student.fullName}`}
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
