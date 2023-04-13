import {schoolapi} from "../api/schoolapi.js";

export class StudentsService {
  static async getStudentsData() {
    const {data} = await schoolapi.get('student')
    return data
  }

  static async createStudent(newStudent){
    const {data} = await schoolapi.post('student', newStudent)
    return data
  }

  static async updateStudent(studentFormObj) {
    const id = studentFormObj.id
    delete studentFormObj.id
    const {data} = await schoolapi.put(`student/${id}`, studentFormObj)
    return data
  }

  static async getStudentSubjects(studentId){
    const {data} = await schoolapi.get(`student/${studentId}/getSubjects`)
    return data
  }

  static async attachSubject(studentId, requestBody){
    const {data} = await schoolapi.post(`student/${studentId}/addSubject`, requestBody)
    return data
  }

  static async deleteStudentSubject(id){
    const {data} = await schoolapi.delete(`student/deleteStudentSubject/${id}`)
    return data
  }

  static async deleteStudent(id) {
    const {data} = await schoolapi.delete(`student/${id}`)
    return data
  }
}