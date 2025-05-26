import { createRouter, createWebHistory } from 'vue-router'
import CourseLesson from '../components/CourseLesson.vue'
import FlashCardViewer from '../components/FlashCardViewer.vue'

const routes = [
  { path: '/', name: 'CourseLesson', component: CourseLesson },
  { path: '/lesson/:id', name: 'FlashCardViewer', component: FlashCardViewer }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router