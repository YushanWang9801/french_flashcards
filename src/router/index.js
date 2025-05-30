import { createRouter, createWebHistory } from 'vue-router'
import CourseLesson from '../components/CourseLesson.vue'
import FlashCardViewer from '../components/FlashcardViewer.vue'

const routes = [
  { path: '/', component: CourseLesson },
  { path: '/lesson/:slug', component: FlashCardViewer }
]

export default createRouter({
  history: createWebHistory('/french_flashcards/'),
  routes
})