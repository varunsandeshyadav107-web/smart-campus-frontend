import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import StudentForm from '../components/StudentForm.jsx'
import Loader from '../components/Loader.jsx'
import { getStudent, updateStudent } from '../services/studentService.js'
import { getErrorInfo } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'
import { IconArrowLeft } from '../components/Icons.jsx'

export default function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    getStudent(id)
      .then(setStudent)
      .catch((e) => toast.error(getErrorInfo(e).message))
      .finally(() => setLoading(false))
  }, [id, toast])

  async function handleSubmit(values) {
    setSaving(true)
    setFieldErrors({})
    try {
      const saved = await updateStudent(id, values)
      toast.success(`${saved.fullName}'s profile updated!`)
      navigate('/students', { state: { success: `${saved.fullName}'s record was updated.` } })
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
        <h1 className="page-title">Modify Student Profile</h1>
        <p className="page-description">
          Update enrollment details, department affiliation, or contact records.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading student record from database..." />
      ) : student ? (
        <StudentForm
          initialValues={{ ...student, yearOfStudy: String(student.yearOfStudy) }}
          onSubmit={handleSubmit}
          submitText="Save Changes"
          saving={saving}
          serverErrors={fieldErrors}
        />
      ) : (
        <div className="error-card">Record not found.</div>
      )}
    </div>
  )
}
