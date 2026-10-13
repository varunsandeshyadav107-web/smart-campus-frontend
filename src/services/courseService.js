import api, { getErrorInfo } from './api.js'
import { mockStore } from './mockData.js'

export const getCourses = async (search = '') => {
  try {
    const res = await api.get('/courses', { params: search ? { search } : {} })
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getCourses()
      if (!search) return list
      const s = search.toLowerCase()
      return list.filter(
        (c) =>
          c.courseName?.toLowerCase().includes(s) ||
          c.courseCode?.toLowerCase().includes(s) ||
          c.department?.toLowerCase().includes(s) ||
          c.instructor?.toLowerCase().includes(s)
      )
    }
    throw err
  }
}

export const getCourse = async (id) => {
  try {
    const res = await api.get(`/courses/${id}`)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getCourses()
      const found = list.find((c) => String(c.id) === String(id))
      if (!found) throw new Error(`Course not found with id ${id}`)
      return found
    }
    throw err
  }
}

export const createCourse = async (course) => {
  try {
    const res = await api.post('/courses', course)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getCourses()
      if (list.some((c) => c.courseCode.toLowerCase() === course.courseCode.trim().toLowerCase())) {
        const error = new Error(`Course code '${course.courseCode}' already exists`)
        error.response = { status: 409, data: { message: `Course code '${course.courseCode}' already exists` } }
        throw error
      }
      const newCourse = {
        ...course,
        id: Date.now(),
      }
      list.unshift(newCourse)
      mockStore.saveCourses(list)
      return newCourse
    }
    throw err
  }
}

export const updateCourse = async (id, course) => {
  try {
    const res = await api.put(`/courses/${id}`, course)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getCourses()
      const idx = list.findIndex((c) => String(c.id) === String(id))
      if (idx === -1) throw new Error(`Course not found with id ${id}`)

      if (
        list.some(
          (c) =>
            String(c.id) !== String(id) &&
            c.courseCode.toLowerCase() === course.courseCode.trim().toLowerCase()
        )
      ) {
        const error = new Error(`Course code '${course.courseCode}' already exists`)
        error.response = { status: 409, data: { message: `Course code '${course.courseCode}' already exists` } }
        throw error
      }

      const updated = { ...list[idx], ...course, id: Number(id) }
      list[idx] = updated
      mockStore.saveCourses(list)
      return updated
    }
    throw err
  }
}

export const deleteCourse = async (id) => {
  try {
    const res = await api.delete(`/courses/${id}`)
    return res.data
  } catch (err) {
    const info = getErrorInfo(err)
    if (info.isNetworkError) {
      const list = mockStore.getCourses()
      const filtered = list.filter((c) => String(c.id) !== String(id))
      mockStore.saveCourses(filtered)
      return { message: 'Course deleted successfully' }
    }
    throw err
  }
}
