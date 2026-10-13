import api, { getErrorInfo } from './api.js'
import { mockStore } from './mockData.js'

export const getFacultyList = async (search = '') => {
  try {
    const res = await api.get('/faculty', { params: search ? { search } : {} })
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getFaculty()
      if (!search) return list
      const s = search.toLowerCase()
      return list.filter(
        (f) =>
          f.fullName?.toLowerCase().includes(s) ||
          f.facultyId?.toLowerCase().includes(s) ||
          f.department?.toLowerCase().includes(s) ||
          f.designation?.toLowerCase().includes(s) ||
          f.email?.toLowerCase().includes(s)
      )
    }
    throw err
  }
}

export const getFaculty = async (id) => {
  try {
    const res = await api.get(`/faculty/${id}`)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getFaculty()
      const found = list.find((f) => String(f.id) === String(id))
      if (!found) throw new Error(`Faculty not found with id ${id}`)
      return found
    }
    throw err
  }
}

export const createFaculty = async (faculty) => {
  try {
    const res = await api.post('/faculty', faculty)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getFaculty()
      if (list.some((f) => f.facultyId.toLowerCase() === faculty.facultyId.trim().toLowerCase())) {
        const error = new Error(`Faculty ID '${faculty.facultyId}' already exists`)
        error.response = { status: 409, data: { message: `Faculty ID '${faculty.facultyId}' already exists` } }
        throw error
      }
      if (list.some((f) => f.email.toLowerCase() === faculty.email.trim().toLowerCase())) {
        const error = new Error(`Email '${faculty.email}' already exists`)
        error.response = { status: 409, data: { message: `Email '${faculty.email}' already exists` } }
        throw error
      }
      const newFaculty = {
        ...faculty,
        id: Date.now(),
      }
      list.unshift(newFaculty)
      mockStore.saveFaculty(list)
      return newFaculty
    }
    throw err
  }
}

export const updateFaculty = async (id, faculty) => {
  try {
    const res = await api.put(`/faculty/${id}`, faculty)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getFaculty()
      const idx = list.findIndex((f) => String(f.id) === String(id))
      if (idx === -1) throw new Error(`Faculty not found with id ${id}`)

      if (
        list.some(
          (f) =>
            String(f.id) !== String(id) &&
            f.facultyId.toLowerCase() === faculty.facultyId.trim().toLowerCase()
        )
      ) {
        const error = new Error(`Faculty ID '${faculty.facultyId}' already exists`)
        error.response = { status: 409, data: { message: `Faculty ID '${faculty.facultyId}' already exists` } }
        throw error
      }

      const updated = { ...list[idx], ...faculty, id: Number(id) }
      list[idx] = updated
      mockStore.saveFaculty(list)
      return updated
    }
    throw err
  }
}

export const deleteFaculty = async (id) => {
  try {
    const res = await api.delete(`/faculty/${id}`)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getFaculty()
      const filtered = list.filter((f) => String(f.id) !== String(id))
      mockStore.saveFaculty(filtered)
      return { message: 'Faculty deleted successfully' }
    }
    throw err
  }
}
