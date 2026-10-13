import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck, IconClose } from './Icons.jsx'

const EMPTY = {
  rollNumber: '',
  fullName: '',
  email: '',
  department: 'CSE',
  yearOfStudy: '1',
  phoneNumber: '',
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

const YEARS = [1, 2, 3, 4, 5, 6]

export default function StudentForm({
  initialValues,
  onSubmit,
  submitText = 'Save Student',
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

  function handleYearSelect(year) {
    setValues((prev) => ({ ...prev, yearOfStudy: String(year) }))
    setClientErrors((prev) => ({ ...prev, yearOfStudy: undefined }))
  }

  function validate() {
    const errs = {}
    if (!values.rollNumber.trim()) errs.rollNumber = 'Roll number is required (e.g., 22CSE101)'
    if (!values.fullName.trim()) errs.fullName = 'Full student name is required'
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      errs.email = 'Please provide a valid institutional email'
    }
    if (!values.department.trim()) errs.department = 'Academic department is required'
    const y = Number(values.yearOfStudy)
    if (!Number.isInteger(y) || y < 1 || y > 6) {
      errs.yearOfStudy = 'Year must be between 1 and 6'
    }
    if (!/^[0-9+\-\s]{7,15}$/.test(values.phoneNumber.trim())) {
      errs.phoneNumber = 'Valid phone number is required (7-15 digits)'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate()
    setClientErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit({
      ...values,
      rollNumber: values.rollNumber.trim().toUpperCase(),
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phoneNumber: values.phoneNumber.trim(),
      yearOfStudy: Number(values.yearOfStudy),
    })
  }

  return (
    <form className="glass-form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-section">
        <div className="form-section-header">
          <span className="section-number">1</span>
          <div>
            <h4 className="section-title">Identity & Profile</h4>
            <p className="section-subtitle">Student identification numbers and legal name</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="rollNumber">
              Roll / Registration Number <span className="req">*</span>
            </label>
            <input
              id="rollNumber"
              name="rollNumber"
              value={values.rollNumber}
              onChange={handleChange}
              className={`form-input ${errors.rollNumber ? 'input-error' : ''}`}
              placeholder="e.g. 22CSE101"
              autoComplete="off"
            />
            {errors.rollNumber ? (
              <span className="field-error-msg">{errors.rollNumber}</span>
            ) : (
              <span className="field-hint">Unique institutional identification string</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="fullName">
              Full Legal Name <span className="req">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              placeholder="e.g. Ananya Reddy"
              autoComplete="name"
            />
            {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <span className="section-number">2</span>
          <div>
            <h4 className="section-title">Academic Enrollment</h4>
            <p className="section-subtitle">Department branch and current year of matriculation</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="department">
              Department / Major <span className="req">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={values.department}
              onChange={handleChange}
              className={`form-select ${errors.department ? 'input-error' : ''}`}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept} Department
                </option>
              ))}
            </select>
            {errors.department && <span className="field-error-msg">{errors.department}</span>}
          </div>

          <div className="form-field">
            <label>
              Year of Study <span className="req">*</span>
            </label>
            <div className="year-selector-pills">
              {YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleYearSelect(y)}
                  className={`year-btn ${String(values.yearOfStudy) === String(y) ? 'year-btn-active' : ''}`}
                >
                  Yr {y}
                </button>
              ))}
            </div>
            {errors.yearOfStudy && <span className="field-error-msg">{errors.yearOfStudy}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <span className="section-number">3</span>
          <div>
            <h4 className="section-title">Contact & Communication</h4>
            <p className="section-subtitle">Official email address and primary telephone number</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="email">
              College Email Address <span className="req">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="e.g. ananya.reddy@college.edu"
              autoComplete="email"
            />
            {errors.email && <span className="field-error-msg">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber">
              Phone Number <span className="req">*</span>
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={values.phoneNumber}
              onChange={handleChange}
              className={`form-input ${errors.phoneNumber ? 'input-error' : ''}`}
              placeholder="e.g. +91 98765 43210"
              autoComplete="tel"
            />
            {errors.phoneNumber && <span className="field-error-msg">{errors.phoneNumber}</span>}
          </div>
        </div>
      </div>

      <div className="form-actions-bar">
        <Link to="/students" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? (
            <>
              <span className="spinner-sm" />
              <span>Saving Record...</span>
            </>
          ) : (
            <>
              <IconCheck size={16} />
              <span>{submitText}</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
