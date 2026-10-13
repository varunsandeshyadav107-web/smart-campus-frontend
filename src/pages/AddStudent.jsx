import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import StudentForm from '../components/StudentForm.jsx'
import { createStudent } from '../services/studentService.js'
import { getErrorInfo } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'
import { IconArrowLeft } from '../components/Icons.jsx'

export default function AddStudent() {
  const navigate = useNavigate()
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  async function handleSubmit(values) {
    setSaving(true)
    setFieldErrors({})
    try {
      const saved = await createStudent(values)
      toast.success(`${saved.fullName} registered successfully!`)
      navigate('/students', { state: { success: `${saved.fullName} was enrolled successfully.` } })
    } catch (e) {
      const info = getErrorInfo(e)
      toast.error(info.message)
      if (info.fieldErrors) {
        setFieldErrors(info.fieldErrors)
      }
      setSaving(false)
    }
  }

  return (
    <div className="page-container form-page-container">
      <div className="form-header-row">
        <Link to="/students" className="back-link">
          <IconArrowLeft size={16} />
          <span>Back to Students</span>
        </Link>
        <h1 className="page-title">Enroll New Student</h1>
        <p className="page-description">
          Add an academic record to the campus database. Roll number and institutional email must be distinct.
        </p>
      </div>

      <StudentForm
        onSubmit={handleSubmit}
        submitText="Complete Enrollment"
        saving={saving}
        serverErrors={fieldErrors}
      />
    </div>
  )
}
