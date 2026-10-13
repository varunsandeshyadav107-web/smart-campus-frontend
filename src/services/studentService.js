import api, { getErrorInfo } from './api.js'
import { mockStore } from './mockData.js'

export const getStudents = async (search = '') => {
  try {
    const res = await api.get('/students', { params: search ? { search } : {} })
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getStudents()
      if (!search) return list
      const s = search.toLowerCase()
      return list.filter(
        (st) =>
          st.fullName?.toLowerCase().includes(s) ||
          st.rollNumber?.toLowerCase().includes(s) ||
          st.department?.toLowerCase().includes(s) ||
          st.email?.toLowerCase().includes(s)
      )
    }
    throw err
  }
}

export const getStudent = async (id) => {
  try {
    const res = await api.get(`/students/${id}`)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getStudents()
      const found = list.find((s) => String(s.id) === String(id))
      if (!found) throw new Error(`Student not found with id ${id}`)
      return found
    }
    throw err
  }
}

export const createStudent = async (student) => {
  try {
    const res = await api.post('/students', student)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getStudents()
      if (list.some((s) => s.rollNumber.toLowerCase() === student.rollNumber.trim().toLowerCase())) {
        const error = new Error(`Roll number '${student.rollNumber}' already exists`)
        error.response = { status: 409, data: { message: `Roll number '${student.rollNumber}' already exists` } }
        throw error
      }
      if (list.some((s) => s.email.toLowerCase() === student.email.trim().toLowerCase())) {
        const error = new Error(`Email '${student.email}' already exists`)
        error.response = { status: 409, data: { message: `Email '${student.email}' already exists` } }
        throw error
      }
      const newStudent = {
        ...student,
        id: Date.now(),
      }
      list.unshift(newStudent)
      mockStore.saveStudents(list)
      return newStudent
    }
    throw err
  }
}

export const updateStudent = async (id, student) => {
  try {
    const res = await api.put(`/students/${id}`, student)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getStudents()
      const idx = list.findIndex((s) => String(s.id) === String(id))
      if (idx === -1) throw new Error(`Student not found with id ${id}`)

      if (
        list.some(
          (s) =>
            String(s.id) !== String(id) &&
            s.rollNumber.toLowerCase() === student.rollNumber.trim().toLowerCase()
        )
      ) {
        const error = new Error(`Roll number '${student.rollNumber}' already exists`)
        error.response = { status: 409, data: { message: `Roll number '${student.rollNumber}' already exists` } }
        throw error
      }
      if (
        list.some(
          (s) =>
            String(s.id) !== String(id) &&
            s.email.toLowerCase() === student.email.trim().toLowerCase()
        )
      ) {
        const error = new Error(`Email '${student.email}' already exists`)
        error.response = { status: 409, data: { message: `Email '${student.email}' already exists` } }
        throw error
      }

      const updated = { ...list[idx], ...student, id: Number(id) }
      list[idx] = updated
      mockStore.saveStudents(list)
      return updated
    }
    throw err
  }
}

export const deleteStudent = async (id) => {
  try {
    const res = await api.delete(`/students/${id}`)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getStudents()
      const filtered = list.filter((s) => String(s.id) !== String(id))
      mockStore.saveStudents(filtered)
      return { message: 'Student deleted successfully' }
    }
    throw err
  }
}

export const getDashboardStats = async () => {
  try {
    const res = await api.get('/dashboard/stats')
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const students = mockStore.getStudents()
      const faculty = mockStore.getFaculty()
      const courses = mockStore.getCourses()
      return {
        totalStudents: students.length,
        totalFaculty: faculty.length,
        totalCourses: courses.length,
      }
    }
    throw err
  }
}
