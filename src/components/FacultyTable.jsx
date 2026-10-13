import { IconEdit, IconTrash, IconMail, IconPhone } from './Icons.jsx'
import { getDepartmentColorClass, getInitials } from './StudentTable.jsx'

export default function FacultyTable({ facultyList, onEdit, onDelete }) {
  return (
    <div className="table-responsive-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Faculty Member</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Contact</th>
            <th className="th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.map((faculty) => (
            <tr key={faculty.id} className="table-row-hover">
              <td data-label="Faculty Member">
                <div className="student-cell">
                  <div className={`student-avatar ${getDepartmentColorClass(faculty.department)}`}>
                    {getInitials(faculty.fullName)}
                  </div>
                  <div className="student-meta">
                    <span className="student-name-bold">{faculty.fullName}</span>
                    <span className="student-email-sub">{faculty.email}</span>
                  </div>
                </div>
              </td>

              <td data-label="Employee ID">
                <span className="code-pill">{faculty.facultyId}</span>
              </td>

              <td data-label="Department">
                <span className={`dept-badge ${getDepartmentColorClass(faculty.department)}`}>
                  {faculty.department}
                </span>
              </td>

              <td data-label="Designation">
                <span className="designation-pill">{faculty.designation}</span>
              </td>

              <td data-label="Contact">
                <span className="phone-text">{faculty.phoneNumber}</span>
              </td>

              <td data-label="Actions" className="td-actions">
                <div className="action-button-group">
                  <button
                    onClick={() => onEdit(faculty)}
                    className="action-btn action-edit"
                    title="Edit faculty member"
                    aria-label={`Edit ${faculty.fullName}`}
                  >
                    <IconEdit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(faculty)}
                    className="action-btn action-delete"
                    title="Delete faculty member"
                    aria-label={`Delete ${faculty.fullName}`}
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
