<template>
  <div class="container-lg">
    <h2>Alumnos ({{students ? students.length : ''}})</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo</th>
            <th scope="col">Estatus</th>
            <th scope="col">F. Nacimiento</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="students?.length < 1">
            <td colspan="7" class="text-center">No existen alumnos registrados</td>
          </tr>
          <tr v-for="student in students" :key="student.id">
            <th scope="row">{{student.id}}</th>
            <td>{{student.firstname}}</td>
            <td>{{student.lastname}}</td>
            <td>{{student.email}}</td>
            <td>
              <span :class="`badge bg-${student.active ? 'success' : 'danger'}`"> {{student.active ? 'Activo' : 'Inactivo'}} </span>
            </td>
            <td>{{formatDate(new Date(student.dateOfBirth))}}</td>
            <td>
              <button
                type="button"
                class="btn btn-warning btn-sm mx-1"
                title="Editar alumno"
                data-bs-toggle="modal"
                data-bs-target="#studentModal"
                @click="onEditNewStudent(student)">
                <i class='bx bx-edit'></i>
              </button>
              <button
                type="button"
                class="btn btn-info btn-sm mx-1"
                title="Calificar alumno"
                data-bs-toggle="modal"
                data-bs-target="#studentSubjectModal"
                @click="onListStudentSubjects(student)"
              >
                <i class='bx bx-list-check'></i>
              </button>
              <button type="button" class="btn btn-danger btn-sm mx-1" @click="deleteStudent(student)">
                  <i class='bx bx-x-circle'></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
  <div class="position-absolute top-0 end-0">
    <button
      type="button"
      class="btn btn-success m-3 btn-sm"
      data-bs-toggle="modal"
      data-bs-target="#studentModal"
      @click="onAddNewStudent">
      Agregar alumno
    </button>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby="studentModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="studentModalLabel">{{isEditing ? '': 'Nuevo '}}Alumno</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Nombres</label>
              <input type="text" class="form-control" v-model="studentFormObj.firstname">
            </div>
            <div class="mb-3">
              <label class="form-label">Apellidos</label>
              <input type="text" class="form-control" v-model="studentFormObj.lastname">
            </div>
            <div class="mb-3">
              <label class="form-label">Correo</label>
              <input type="email" class="form-control" v-model="studentFormObj.email">
            </div>
            <div class="mb-3">
                <label class="form-label">Fecha de nacimiento</label>
                <input type="date" class="form-control" v-model="studentFormObj.dateOfBirth">
            </div>
              <div class="mb-3 form-check" v-if="isEditing">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="studentFormObj.active">
                <label class="form-check-label" for="exampleCheck1">Activo</label>
              </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeButton">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="saveStudent">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="studentSubjectModal" tabindex="-1" aria-labelledby="studentSubjectModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="studentSubjectModalLabel">Materias del alumno: {{selectedStudent?.firstname}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">N. de la Materia</th>
              <th scope="col">Calificación</th>
              <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="studentSubjects.length < 1">
                <td colspan="4" class="text-center"> Sin materias capturadas </td>
            </tr>
            <tr v-else v-for="{subject, grade, id} in studentSubjects" :key="subject.id">
              <th scope="row">{{subject.id}}</th>
              <td>{{subject.name}}</td>
              <td class="text-center">{{grade ?? '---'}}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  title="Ver alumnos"
                  @click="deleteStudentSubject(id)"
                >
                    <i class='bx bx-x-circle'></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col-9">
              <select class="form-select" aria-label="Default select example" v-model="selectedSubject">
                <option v-for="subject in filterSubjects(studentSubjects, subjects)" :value="subject.id">{{subject.name}}</option>
              </select>
            </div>
            <div class="col-3">
                <input type="number" class="form-control" v-model="subjectGrade" min="0" max="10">
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeEditButton">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="attachSubject" :disabled="!selectedSubject">Guardar</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {formatDate} from "../helpers/formatDate.js";
import {StudentsService} from "../services/StudentsService.js";
import {SubjectsService} from "../services/SubjectsService.js";
import {filterSubjects} from "../helpers/filterSubjects.js";

export default {
  data(){
    return {
      students: null,
      studentFormObj: {
        firstname: null,
        lastname: null,
        email: null,
        dateOfBirth: null,
      },
      studentSubjects: [],
      subjects: [],
      isEditing: false,
      subjectGrade: null,
      selectedSubject: null,
      selectedStudent: null,
    }
  },
  async created() {
    await this.getStudentsData()
    await this.getSubjectsData()
  },
  methods: {
    filterSubjects,
    formatDate,
    async deleteStudent(student) {
      await StudentsService.deleteStudent(student.id)
      await this.getStudentsData()
    },
    async deleteStudentSubject(id){
      await StudentsService.deleteStudentSubject(id)
      await this.onListStudentSubjects(this.selectedStudent)
    },
    async getStudentsData(){
      this.students = await StudentsService.getStudentsData()
    },
    async getSubjectsData(){
      this.subjects = await SubjectsService.getSubjectsData()
    },
    resetStudentFormObjForm(){
      this.studentFormObj = {
        firstname: null,
        lastname: null,
        email: null,
        dateOfBirth: null,
      }
    },
    async saveStudent() {
      this.studentFormObj.dateOfBirth = new Date(this.studentFormObj.dateOfBirth)
      if (this.isEditing){
        await StudentsService.updateStudent(this.studentFormObj)
      } else{
        await StudentsService.createStudent(this.studentFormObj)
      }
      this.$refs.closeButton.click()
      this.$refs.closeEditButton.click()
      this.resetStudentFormObjForm()
      await this.getStudentsData()
    },
    onAddNewStudent(){
      this.isEditing = false
      this.resetStudentFormObjForm()
    },
    onEditNewStudent(studentSelected){
      this.isEditing = true
      this.studentFormObj = {...studentSelected}
      this.studentFormObj.active = studentSelected.active
    },
    async onListStudentSubjects(selectedStudent){
      const response = await StudentsService.getStudentSubjects(selectedStudent.id)
      this.selectedStudent = selectedStudent
      this.studentSubjects = response
    },
    async attachSubject(){
      const requestBody = {
        subjectId: this.selectedSubject,
        grade: this.subjectGrade
      }
      await StudentsService.attachSubject(this.selectedStudent.id, requestBody)
      this.selectedSubject = null
      this.subjectGrade = null
      await this.onListStudentSubjects(this.selectedStudent)
    },
  }
}
</script>

<style scoped>

</style>