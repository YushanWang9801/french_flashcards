import { createRouter, createWebHistory } from 'vue-router'
import CourseLesson from '../components/CourseLesson.vue'
import FlashCardViewer from '../components/FlashCardViewer.vue'

const routes = [
  { path: '/', name: 'CourseLesson', component: CourseLesson },
  { path: '/lesson/:slug', name: 'FlashCardViewer', component: FlashCardViewer }
]

const router = createRouter({
  history: createWebHistory('/french_flashcards'),
  routes
})

export default router