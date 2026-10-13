import { useState } from 'react'
import { IconCheck, IconClose } from './Icons.jsx'

const EMPTY = {
  facultyId: '',
  fullName: '',
  email: '',
  department: 'CSE',
  designation: 'Assistant Professor',
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

const DESIGNATIONS = [
  'Professor & HOD',
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Lecturer',
  'Adjunct Faculty',
]

export default function FacultyForm({
  initialValues,
  onSubmit,
  onCancel,
  submitText = 'Save Faculty',
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
    if (!values.facultyId.trim()) errs.facultyId = 'Employee ID is required (e.g. FAC-CSE-01)'
    if (!values.fullName.trim()) errs.fullName = 'Full faculty name is required'
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      errs.email = 'Valid institutional email is required'
    }
    if (!values.department.trim()) errs.department = 'Department is required'
    if (!values.designation.trim()) errs.designation = 'Designation is required'
    if (!/^[0-9+\-\s]{7,15}$/.test(values.phoneNumber.trim())) {
      errs.phoneNumber = 'Phone must be 7-15 digits'
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
      facultyId: values.facultyId.trim().toUpperCase(),
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phoneNumber: values.phoneNumber.trim(),
    })
  }

  return (
    <form className="glass-form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="facultyId">Employee / Faculty ID <span className="req">*</span></label>
          <input
            id="facultyId"
            name="facultyId"
            value={values.facultyId}
            onChange={handleChange}
            className={`form-input ${errors.facultyId ? 'input-error' : ''}`}
            placeholder="e.g. FAC-CSE-01"
          />
          {errors.facultyId && <span className="field-error-msg">{errors.facultyId}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="fullName">Full Name <span className="req">*</span></label>
          <input
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            className={`form-input ${errors.fullName ? 'input-error' : ''}`}
            placeholder="e.g. Dr. K. Srinivas Rao"
          />
          {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
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
          <label htmlFor="designation">Academic Designation <span className="req">*</span></label>
          <select
            id="designation"
            name="designation"
            value={values.designation}
            onChange={handleChange}
            className={`form-select ${errors.designation ? 'input-error' : ''}`}
          >
            {DESIGNATIONS.map((des) => (
              <option key={des} value={des}>{des}</option>
            ))}
          </select>
          {errors.designation && <span className="field-error-msg">{errors.designation}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Official Email <span className="req">*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            placeholder="e.g. srinivas.rao@college.edu"
          />
          {errors.email && <span className="field-error-msg">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="phoneNumber">Phone Number <span className="req">*</span></label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={values.phoneNumber}
            onChange={handleChange}
            className={`form-input ${errors.phoneNumber ? 'input-error' : ''}`}
            placeholder="e.g. +91 98112 23344"
          />
          {errors.phoneNumber && <span className="field-error-msg">{errors.phoneNumber}</span>}
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
