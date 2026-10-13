import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/courseService.js'
import { getErrorInfo } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'
import CourseTable from '../components/CourseTable.jsx'
import CourseForm from '../components/CourseForm.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import Loader from '../components/Loader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconClose,
  IconFilter,
} from '../components/Icons.jsx'

const DEPARTMENTS = ['All', 'CSE', 'ECE', 'EEE', 'IT', 'Mechanical', 'Civil', 'Other']
const SEMESTERS = ['All', '1', '2', '3', '4', '5', '6', '7', '8']

export default function Courses() {
  const toast = useToast()
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedSem, setSelectedSem] = useState('All')
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const [formSaving, setFormSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (e) {
      toast.error(getErrorInfo(e).message)
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        if (!search.trim()) return true
        const q = search.toLowerCase()
        return (
          c.courseName?.toLowerCase().includes(q) ||
          c.courseCode?.toLowerCase().includes(q) ||
          c.department?.toLowerCase().includes(q) ||
          c.instructor?.toLowerCase().includes(q)
        )
      })
      .filter((c) => {
        if (selectedDept === 'All') return true
        return c.department?.toUpperCase() === selectedDept.toUpperCase()
      })
      .filter((c) => {
        if (selectedSem === 'All') return true
        return String(c.semester) === String(selectedSem)
      })
  }, [courses, search, selectedDept, selectedSem])

  async function handleCreateCourse(values) {
    setFormSaving(true)
    setFormErrors({})
    try {
      const saved = await createCourse(values)
      toast.success(`${saved.courseCode} added to Curriculum Catalog!`)
      setShowAddModal(false)
      loadData()
    } catch (e) {
      const info = getErrorInfo(e)
      toast.error(info.message)
      if (info.fieldErrors) setFormErrors(info.fieldErrors)
    } finally {
      setFormSaving(false)
    }
  }

  async function handleUpdateCourse(values) {
    setFormSaving(true)
    setFormErrors({})
    try {
      const saved = await updateCourse(editingCourse.id, values)
      toast.success(`${saved.courseCode} updated successfully!`)
      setEditingCourse(null)
      loadData()
    } catch (e) {
      const info = getErrorInfo(e)
      toast.error(info.message)
      if (info.fieldErrors) setFormErrors(info.fieldErrors)
    } finally {
      setFormSaving(false)
    }
  }

  async function handleDeleteCourse() {
    if (!toDelete) return
    setDeleting(true)
    try {
      await deleteCourse(toDelete.id)
      toast.success(`${toDelete.courseCode} (${toDelete.courseName}) removed.`)
      setToDelete(null)
      loadData()
    } catch (e) {
      toast.error(getErrorInfo(e).message)
      setToDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  function exportCSV() {
    if (filteredCourses.length === 0) {
      toast.info('No course records to export')
      return
    }

    const headers = ['Course Code', 'Course Title', 'Department', 'Credits', 'Semester', 'Instructor']
    const rows = filteredCourses.map((c) => [
      `"${c.courseCode}"`,
      `"${c.courseName}"`,
      `"${c.department}"`,
      `"${c.credits}"`,
      `"${c.semester}"`,
      `"${c.instructor}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `course_catalog_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`Exported ${filteredCourses.length} courses to CSV`)
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <div className="page-title-badge-row">
            <h1 className="page-title">Academic Courses</h1>
            <span className="count-badge">{filteredCourses.length} Courses</span>
          </div>
          <p className="page-description">
            Syllabus curriculum, departmental offerings, credit allocations, and designated faculty.
          </p>
        </div>

        <div className="page-actions-group">
          <button onClick={exportCSV} className="btn btn-secondary">
            <IconDownload size={16} />
            <span>Export CSV</span>
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <IconPlus size={16} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="control-bar-panel">
        <div className="search-input-wrap">
          <IconSearch size={17} className="search-icon-left" />
          <input
            type="search"
            className="filter-search-input"
            placeholder="Search by course code, title, instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear-btn" onClick={() => setSearch('')}>
              <IconClose size={15} />
            </button>
          )}
        </div>

        <div className="filter-controls-group">
          <div className="filter-select-wrap">
            <IconFilter size={15} className="filter-icon" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="filter-select"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select-wrap">
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="filter-select"
            >
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Semesters' : `Semester ${s}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Loader text="Loading course catalog..." />
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          title={search || selectedDept !== 'All' ? 'No matching courses' : 'No courses registered'}
          message="No records found matching your filters. Add a curriculum course to populate this section."
          actionText="Add Course"
          onAction={() => setShowAddModal(true)}
        />
      ) : (
        <CourseTable
          courses={filteredCourses}
          onEdit={setEditingCourse}
          onDelete={setToDelete}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-row">
              <h3 className="modal-dialog-title">Add Curriculum Course</h3>
              <button
                className="btn-icon"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                <IconClose size={18} />
              </button>
            </div>
            <CourseForm
              onSubmit={handleCreateCourse}
              onCancel={() => setShowAddModal(false)}
              submitText="Add Course"
              saving={formSaving}
              serverErrors={formErrors}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCourse && (
        <div className="modal-backdrop" onClick={() => setEditingCourse(null)}>
          <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-row">
              <h3 className="modal-dialog-title">Update Course Information</h3>
              <button
                className="btn-icon"
                onClick={() => setEditingCourse(null)}
                aria-label="Close"
              >
                <IconClose size={18} />
              </button>
            </div>
            <CourseForm
              initialValues={editingCourse}
              onSubmit={handleUpdateCourse}
              onCancel={() => setEditingCourse(null)}
              submitText="Save Changes"
              saving={formSaving}
              serverErrors={formErrors}
            />
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {toDelete && (
        <ConfirmDialog
          title="Delete Academic Course"
          message={`Remove ${toDelete.courseCode} (${toDelete.courseName}) from the institutional catalog?`}
          busy={deleting}
          onConfirm={handleDeleteCourse}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
