import StudentPage from "../pages/StudentPage.vue";
import SubjectPage from "../pages/Subject Page.vue";

import {createRouter, createWebHashHistory} from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/student'
  },
  {
    path: '/student',
    name: 'student',
    component: StudentPage
  },
  {
    path: '/subject',
    name: 'subject',
    component: SubjectPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/student'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export {
  router
}