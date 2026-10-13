import { useState } from 'react'

const EMPTY = {
  courseCode: '',
  courseName: '',
  department: 'CSE',
  credits: '3',
  semester: '3',
  instructor: '',
}

const DEPARTMENTS = [
  'CSE',
  'ECE',
  'EEE',
  'IT',
  'Mechanical',
  'Civil',
  'Chemical',
  'Other',
]

export default function CourseForm({
  initialValues,
  onSubmit,
  onCancel,
  submitText = 'Save Course',
  saving,
  serverErrors = {},
}) {
  const [values, setValues] = useState({ ...EMPTY, ...(initialValues || {}) })
  const [clientErrors, setClientErrors] = useState({})

  const errors = { ...serverErrors, ...clientErrors }

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setClientErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function validate() {
    const errs = {}
    if (!values.courseCode.trim()) errs.courseCode = 'Course code is required (e.g. CS301)'
    if (!values.courseName.trim()) errs.courseName = 'Course title is required'
    if (!values.department.trim()) errs.department = 'Department is required'
    const cred = Number(values.credits)
    if (!Number.isInteger(cred) || cred < 1 || cred > 6) {
      errs.credits = 'Credits must be between 1 and 6'
    }
    const sem = Number(values.semester)
    if (!Number.isInteger(sem) || sem < 1 || sem > 8) {
      errs.semester = 'Semester must be between 1 and 8'
    }
    if (!values.instructor.trim()) errs.instructor = 'Instructor name is required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate()
    setClientErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit({
      ...values,
      courseCode: values.courseCode.trim().toUpperCase(),
      courseName: values.courseName.trim(),
      instructor: values.instructor.trim(),
      credits: Number(values.credits),
      semester: Number(values.semester),
    })
  }

  return (
    <form className="glass-form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="courseCode">Course Code <span className="req">*</span></label>
          <input
            id="courseCode"
            name="courseCode"
            value={values.courseCode}
            onChange={handleChange}
            className={`form-input ${errors.courseCode ? 'input-error' : ''}`}
            placeholder="e.g. CS301"
          />
          {errors.courseCode && <span className="field-error-msg">{errors.courseCode}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="courseName">Course Title <span className="req">*</span></label>
          <input
            id="courseName"
            name="courseName"
            value={values.courseName}
            onChange={handleChange}
            className={`form-input ${errors.courseName ? 'input-error' : ''}`}
            placeholder="e.g. Data Structures & Algorithms"
          />
          {errors.courseName && <span className="field-error-msg">{errors.courseName}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="department">Department <span className="req">*</span></label>
          <select
            id="department"
            name="department"
            value={values.department}
            onChange={handleChange}
            className={`form-select ${errors.department ? 'input-error' : ''}`}
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <span className="field-error-msg">{errors.department}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="instructor">Assigned Faculty / Instructor <span className="req">*</span></label>
          <input
            id="instructor"
            name="instructor"
            value={values.instructor}
            onChange={handleChange}
            className={`form-input ${errors.instructor ? 'input-error' : ''}`}
            placeholder="e.g. Dr. K. Srinivas Rao"
          />
          {errors.instructor && <span className="field-error-msg">{errors.instructor}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="credits">Credit Hours <span className="req">*</span></label>
          <select
            id="credits"
            name="credits"
            value={values.credits}
            onChange={handleChange}
            className={`form-select ${errors.credits ? 'input-error' : ''}`}
          >
            {[1, 2, 3, 4, 5, 6].map((c) => (
              <option key={c} value={c}>{c} Credits</option>
            ))}
          </select>
          {errors.credits && <span className="field-error-msg">{errors.credits}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="semester">Semester <span className="req">*</span></label>
          <select
            id="semester"
            name="semester"
            value={values.semester}
            onChange={handleChange}
            className={`form-select ${errors.semester ? 'input-error' : ''}`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>
          {errors.semester && <span className="field-error-msg">{errors.semester}</span>}
        </div>
      </div>

      <div className="form-actions-bar">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  )
}
