import {schoolapi} from "../api/schoolapi.js";

export class SubjectsService {
  static async getSubjectsData() {
    const {data} = await schoolapi.get('subject')
    return data
  }

  static async createSubject(newSubject){
    const {data} = await schoolapi.post('subject', newSubject)
    return data
  }

  static async updateSubject(subjectFormObj) {
    const id = subjectFormObj.id
    delete subjectFormObj.id
    const {data} = await schoolapi.put(`subject/${id}`, subjectFormObj)
    console.log(data)
    return data
  }

  static async deleteSubject(id) {
    const {data} = await schoolapi.delete(`subject/${id}`)
    return data
  }
}