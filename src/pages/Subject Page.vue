<template>
  <div class="container-lg">
    <h2>Materias ({{subjects ? subjects.length : ''}})</h2>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Descripción</th>
        <th scope="col">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="subjects?.length < 1">
        <td colspan="4" class="text-center">No existen materias registradas</td>
      </tr>
      <tr v-else v-for="subject in subjects" :key="subject.id">
        <th scope="row">{{subject.id}}</th>
        <td>{{subject.name}}</td>
        <td>{{subject.description}}</td>
        <td>
          <button
            type="button"
            class="btn btn-warning btn-sm mx-1"
            title="Editar materia"
            data-bs-toggle="modal"
            data-bs-target="#subjectModal"
            @click="onEditNewSubject(subject)"
          >
            <i class='bx bx-edit'></i>
          </button>
          <button type="button" class="btn btn-danger btn-sm" title="Eliminar materia" @click="deleteSubject(subject)">
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
      data-bs-target="#subjectModal"
      @click="onAddNewSubject">
      Agregar materia
    </button>
  </div>
  <div class="modal fade" id="subjectModal" tabindex="-1" aria-labelledby="subjectModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="subjectModalLabel">{{isEditing ? '': 'Nueva '}}Materia</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" class="form-control" v-model="subjectForm.name">
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <input type="text" class="form-control" v-model="subjectForm.description">
            </div>
          </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeButton">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveSubject">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {SubjectsService} from "../services/SubjectsService.js";

export default {
  data(){
    return {
      subjects: null,
      subjectForm: {
        name: null,
        description: null,
      },
      isEditing: false,
    }
  },
  async created() {
    await this.getSubjectsData()
  },
  methods: {
    async deleteSubject(subject){
      await SubjectsService.deleteSubject(subject.id)
      await this.getSubjectsData()
    },
    async getSubjectsData(){
      this.subjects = await SubjectsService.getSubjectsData()
    },
    resetSubjectFormObjForm() {
      this.subjectForm = {
        name: null,
        description: null,
      }
    },
    onEditNewSubject(subjectSelected) {
      this.isEditing = true
      this.subjectForm = {...subjectSelected}
    },
    onAddNewSubject() {
      this.isEditing = false
      this.resetSubjectFormObjForm()
    },
    async saveSubject() {
      if (this.isEditing) {
        await SubjectsService.updateSubject(this.subjectForm)
      } else {
        await SubjectsService.createSubject(this.subjectForm)
      }
      this.$refs.closeButton.click()
      this.resetSubjectFormObjForm()
      await this.getSubjectsData()
    }
  },
}
</script>

<style scoped>

</style>