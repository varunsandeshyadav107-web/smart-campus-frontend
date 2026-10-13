import { useCallback, useEffect, useState, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getStudents, deleteStudent } from '../services/studentService.js'
import { getErrorInfo } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'
import StudentTable from '../components/StudentTable.jsx'
import StudentCards from '../components/StudentCards.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import Loader from '../components/Loader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconGrid,
  IconList,
  IconClose,
  IconFilter,
} from '../components/Icons.jsx'

const DEPARTMENTS = ['All', 'CSE', 'ECE', 'EEE', 'IT', 'Mechanical', 'Civil', 'Other']
const YEARS = ['All', '1', '2', '3', '4']

export default function Students() {
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [sortBy, setSortBy] = useState('id-desc')
  const [viewMode, setViewMode] = useState('table') // 'table' | 'cards'
  const [loading, setLoading] = useState(true)
  const [toDelete, setToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Trigger flash message if navigated with state
  useEffect(() => {
    if (location.state?.success) {
      toast.success(location.state.success)
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location, navigate, toast])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getStudents()
      setStudents(data)
    } catch (e) {
      toast.error(getErrorInfo(e).message)
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        if (!search.trim()) return true
        const q = search.toLowerCase()
        return (
          s.fullName?.toLowerCase().includes(q) ||
          s.rollNumber?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q) ||
          s.department?.toLowerCase().includes(q)
        )
      })
      .filter((s) => {
        if (selectedDept === 'All') return true
        return s.department?.toUpperCase() === selectedDept.toUpperCase()
      })
      .filter((s) => {
        if (selectedYear === 'All') return true
        return String(s.yearOfStudy) === String(selectedYear)
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.fullName.localeCompare(b.fullName)
        if (sortBy === 'name-desc') return b.fullName.localeCompare(a.fullName)
        if (sortBy === 'roll-asc') return a.rollNumber.localeCompare(b.rollNumber)
        if (sortBy === 'year-asc') return a.yearOfStudy - b.yearOfStudy
        return (b.id || 0) - (a.id || 0) // default newest first
      })
  }, [students, search, selectedDept, selectedYear, sortBy])

  async function handleConfirmDelete() {
    if (!toDelete) return
    setDeleting(true)
    try {
      await deleteStudent(toDelete.id)
      toast.success(`${toDelete.fullName} (${toDelete.rollNumber}) deleted successfully`)
      setToDelete(null)
      await loadData()
    } catch (e) {
      toast.error(getErrorInfo(e).message)
      setToDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  // Export students to CSV
  function exportCSV() {
    if (filteredStudents.length === 0) {
      toast.info('No student records to export')
      return
    }

    const headers = ['Roll Number', 'Full Name', 'Department', 'Year of Study', 'Email', 'Phone']
    const rows = filteredStudents.map((s) => [
      `"${s.rollNumber}"`,
      `"${s.fullName}"`,
      `"${s.department}"`,
      `"${s.yearOfStudy}"`,
      `"${s.email}"`,
      `"${s.phoneNumber}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `students_roster_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`Exported ${filteredStudents.length} students to CSV`)
  }

  return (
    <div className="page-container">
      {/* Header with Title and Add CTA */}
      <div className="page-header-row">
        <div>
          <div className="page-title-badge-row">
            <h1 className="page-title">Student Directory</h1>
            <span className="count-badge">{filteredStudents.length} Students</span>
          </div>
          <p className="page-description">
            Search, filter, manage matriculation records, and export institutional rosters.
          </p>
        </div>

        <div className="page-actions-group">
          <button onClick={exportCSV} className="btn btn-secondary" title="Export current list to CSV">
            <IconDownload size={16} />
            <span>Export CSV</span>
          </button>
          <Link to="/students/new" className="btn btn-primary">
            <IconPlus size={16} />
            <span>Add Student</span>
          </Link>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Sorters, View Toggle */}
      <div className="control-bar-panel">
        <div className="search-input-wrap">
          <IconSearch size={17} className="search-icon-left" />
          <input
            type="search"
            className="filter-search-input"
            placeholder="Search by name, roll number, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="search-clear-btn"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <IconClose size={15} />
            </button>
          )}
        </div>

        <div className="filter-controls-group">
          {/* Department Filter */}
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

          {/* Year Filter */}
          <div className="filter-select-wrap">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y === 'All' ? 'All Years' : `Year ${y}`}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="filter-select-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="id-desc">Newest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="roll-asc">Roll Number</option>
              <option value="year-asc">Class Year</option>
            </select>
          </div>

          {/* View Mode Toggle: Table or Card Grid */}
          <div className="view-mode-pill">
            <button
              className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              aria-label="Table view"
              title="Table view"
            >
              <IconList size={17} />
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              aria-label="Card grid view"
              title="Card grid view"
            >
              <IconGrid size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <Loader text="Fetching student records from campus database..." />
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          title={search || selectedDept !== 'All' ? 'No matching students' : 'No students registered'}
          message={
            search || selectedDept !== 'All'
              ? 'Try modifying your search criteria or resetting department filters.'
              : 'Begin building your campus roster by adding the first enrolled student.'
          }
          actionText={search || selectedDept !== 'All' ? 'Clear Filters' : 'Add First Student'}
          onAction={
            search || selectedDept !== 'All'
              ? () => {
                  setSearch('')
                  setSelectedDept('All')
                  setSelectedYear('All')
                }
              : undefined
          }
          actionLink={search || selectedDept !== 'All' ? undefined : '/students/new'}
        />
      ) : viewMode === 'table' ? (
        <StudentTable students={filteredStudents} onDelete={setToDelete} />
      ) : (
        <StudentCards students={filteredStudents} onDelete={setToDelete} />
      )}

      {/* Confirm Delete Dialog */}
      {toDelete && (
        <ConfirmDialog
          title="Remove Student Record"
          message={`Are you sure you want to delete ${toDelete.fullName} (${toDelete.rollNumber})? This operation will remove the student permanently from the Aiven database.`}
          confirmText="Yes, Delete Record"
          busy={deleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
