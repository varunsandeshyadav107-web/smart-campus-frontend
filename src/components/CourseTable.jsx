import { IconEdit, IconTrash } from './Icons.jsx'
import { getDepartmentColorClass } from './StudentTable.jsx'

export default function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="table-responsive-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Credits</th>
            <th>Semester</th>
            <th>Instructor</th>
            <th className="th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="table-row-hover">
              <td data-label="Course Code">
                <span className="code-pill font-mono">{course.courseCode}</span>
              </td>

              <td data-label="Course Name">
                <span className="course-name-bold">{course.courseName}</span>
              </td>

              <td data-label="Department">
                <span className={`dept-badge ${getDepartmentColorClass(course.department)}`}>
                  {course.department}
                </span>
              </td>

              <td data-label="Credits">
                <span className="credit-pill">{course.credits} Credits</span>
              </td>

              <td data-label="Semester">
                <span className="sem-pill">Sem {course.semester}</span>
              </td>

              <td data-label="Instructor">
                <span className="instructor-text">{course.instructor}</span>
              </td>

              <td data-label="Actions" className="td-actions">
                <div className="action-button-group">
                  <button
                    onClick={() => onEdit(course)}
                    className="action-btn action-edit"
                    title="Edit course"
                    aria-label={`Edit ${course.courseName}`}
                  >
                    <IconEdit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(course)}
                    className="action-btn action-delete"
                    title="Delete course"
                    aria-label={`Delete ${course.courseName}`}
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
