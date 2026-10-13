import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  getFacultyList,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from '../services/facultyService.js'
import { getErrorInfo } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'
import FacultyTable from '../components/FacultyTable.jsx'
import FacultyForm from '../components/FacultyForm.jsx'
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

export default function Faculty() {
  const toast = useToast()
  const [facultyList, setFacultyList] = useState([])
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const [formSaving, setFormSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getFacultyList()
      setFacultyList(data)
    } catch (e) {
      toast.error(getErrorInfo(e).message)
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filteredFaculty = useMemo(() => {
    return facultyList
      .filter((f) => {
        if (!search.trim()) return true
        const q = search.toLowerCase()
        return (
          f.fullName?.toLowerCase().includes(q) ||
          f.facultyId?.toLowerCase().includes(q) ||
          f.department?.toLowerCase().includes(q) ||
          f.designation?.toLowerCase().includes(q) ||
          f.email?.toLowerCase().includes(q)
        )
      })
      .filter((f) => {
        if (selectedDept === 'All') return true
        return f.department?.toUpperCase() === selectedDept.toUpperCase()
      })
  }, [facultyList, search, selectedDept])

  async function handleCreateFaculty(values) {
    setFormSaving(true)
    setFormErrors({})
    try {
      const saved = await createFaculty(values)
      toast.success(`${saved.fullName} registered to Faculty directory!`)
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

  async function handleUpdateFaculty(values) {
    setFormSaving(true)
    setFormErrors({})
    try {
      const saved = await updateFaculty(editingFaculty.id, values)
      toast.success(`${saved.fullName}'s profile updated!`)
      setEditingFaculty(null)
      loadData()
    } catch (e) {
      const info = getErrorInfo(e)
      toast.error(info.message)
      if (info.fieldErrors) setFormErrors(info.fieldErrors)
    } finally {
      setFormSaving(false)
    }
  }

  async function handleDeleteFaculty() {
    if (!toDelete) return
    setDeleting(true)
    try {
      await deleteFaculty(toDelete.id)
      toast.success(`${toDelete.fullName} removed from registry.`)
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
    if (filteredFaculty.length === 0) {
      toast.info('No faculty records to export')
      return
    }

    const headers = ['Faculty ID', 'Full Name', 'Department', 'Designation', 'Email', 'Phone']
    const rows = filteredFaculty.map((f) => [
      `"${f.facultyId}"`,
      `"${f.fullName}"`,
      `"${f.department}"`,
      `"${f.designation}"`,
      `"${f.email}"`,
      `"${f.phoneNumber}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `faculty_roster_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`Exported ${filteredFaculty.length} faculty members to CSV`)
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <div className="page-title-badge-row">
            <h1 className="page-title">Faculty Registry</h1>
            <span className="count-badge">{filteredFaculty.length} Members</span>
          </div>
          <p className="page-description">
            Academic professors, department chairs, researchers, and teaching staff.
          </p>
        </div>

        <div className="page-actions-group">
          <button onClick={exportCSV} className="btn btn-secondary">
            <IconDownload size={16} />
            <span>Export CSV</span>
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <IconPlus size={16} />
            <span>Add Faculty</span>
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
            placeholder="Search by faculty name, employee ID, designation..."
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
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Loader text="Loading faculty directory..." />
      ) : filteredFaculty.length === 0 ? (
        <EmptyState
          title={search || selectedDept !== 'All' ? 'No matching faculty' : 'No faculty added'}
          message="No records found matching your filters. Add a faculty member to populate this section."
          actionText="Add Faculty Member"
          onAction={() => setShowAddModal(true)}
        />
      ) : (
        <FacultyTable
          facultyList={filteredFaculty}
          onEdit={setEditingFaculty}
          onDelete={setToDelete}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-row">
              <h3 className="modal-dialog-title">Register Faculty Member</h3>
              <button
                className="btn-icon"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                <IconClose size={18} />
              </button>
            </div>
            <FacultyForm
              onSubmit={handleCreateFaculty}
              onCancel={() => setShowAddModal(false)}
              submitText="Enroll Faculty"
              saving={formSaving}
              serverErrors={formErrors}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingFaculty && (
        <div className="modal-backdrop" onClick={() => setEditingFaculty(null)}>
          <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-row">
              <h3 className="modal-dialog-title">Update Faculty Profile</h3>
              <button
                className="btn-icon"
                onClick={() => setEditingFaculty(null)}
                aria-label="Close"
              >
                <IconClose size={18} />
              </button>
            </div>
            <FacultyForm
              initialValues={editingFaculty}
              onSubmit={handleUpdateFaculty}
              onCancel={() => setEditingFaculty(null)}
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
          title="Delete Faculty Member"
          message={`Remove ${toDelete.fullName} (${toDelete.facultyId}) from the campus faculty registry?`}
          busy={deleting}
          onConfirm={handleDeleteFaculty}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
