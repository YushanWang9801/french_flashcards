<template>
  <div class="app-container">
    <header class="app-header">
      <router-link to="/" class="username">French Flashcards</router-link>
    </header>

    <div style="display: flex; gap: 20px;">
      <nav class="breadcrumb">
        <span class="course">{{ courseName }}</span>
        <span class="separator"> &gt; </span>
        <span class="lesson">{{ lesson }}</span>
      </nav>
    </div>

    <!-- Flashcard 查看区域 -->
    <section class="flashcard-viewer" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <!-- 点击翻转 -->
      <div class="flashcard" @click="toggleFlip">
        <div class="card-content" :class="{ flipped: isFlipped }">
          <div class="face front" v-if="!isFlipped">
            {{ currentCard.word }}
          </div>
          <div class="face back" v-else>
            {{ currentCard.translation }}
          </div>
        </div>
      </div>

      <div class="card-index">
        {{ currentIndex + 1 }} / {{ lessonCards.length }}
      </div>

      <!-- 左右切换按钮 -->
      <div class="navigation-buttons">
        <button @click.stop="prevCard"> Prev </button>
        <button @click.stop="nextCard"> Next </button>
      </div>
    </section>

    <!-- Lesson 单词列表 -->
    <section class="card-list">
      <h2>Vocabulary List</h2>
      <ul>
        <li v-for="(card, index) in lessonCards" :key="index" class="card-row">
          <div class="word-pair">
            <span class="french-word">{{ card.word }}</span>
            <span class="english-word">{{ card.translation }}</span>
          </div>
          <div class="examples">
            <p class="french-example">
              <strong>(FR):</strong> {{ card.frenchExample }}
            </p>
            <p class="english-example">
              <strong>Translation (EN):</strong> {{ card.englishExample }}
            </p>
          </div>
        </li>
      </ul>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const courseName = ref('')  // 从 index.json 获取的课程名称
const course = ref('')
const lesson = ref('')

const lessonCards = ref([])
const currentIndex = ref(0)
const isFlipped = ref(false)

const currentCard = computed(() => lessonCards.value[currentIndex.value] || {})

watch(
  () => route.params.slug,
  async (slug) => {
    if (!slug) return

    try {
      const [rawCourse, rawLesson] = slug.split('-')
      course.value = rawCourse
      lesson.value = rawLesson
      console.log(rawCourse, rawLesson)

      // 获取课程数据
      const response = await fetch(`/french_flashcards/data/${rawCourse}.json`)
      const courseData = await response.json()
      lessonCards.value = courseData[rawLesson] || []
      currentIndex.value = 0
      isFlipped.value = false

      // 获取 index.json 以获取 course 显示名
      const indexRes = await fetch('/french_flashcards/data/index.json')
      const indexData = await indexRes.json()
      courseName.value = indexData[rawCourse]
    } catch (e) {
      console.error('加载数据失败:', e)
      lessonCards.value = []
      courseName.value = ''
    }
  },
  { immediate: true }
)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = lessonCards.value.length - 1
  }
  isFlipped.value = false
}

function nextCard() {
  if (currentIndex.value < lessonCards.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  isFlipped.value = false
}

let touchStartX = 0
const handleTouchStart = (event) => {
  touchStartX = event.changedTouches[0].clientX
}

const handleTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX
  const deltaX = touchEndX - touchStartX
  const swipeThreshold = 50
  if (deltaX > swipeThreshold) {
    prevCard()
  } else if (deltaX < -swipeThreshold) {
    nextCard()
  }
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
/* header 样式 */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  background-color: var(--header-bg);
  color: var(--header-color);
}

.username {
  user-select: none;
  color: #00A19C;
}



.toggle-knob {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.3s;
}


/* 主题变量 */
:root {
  --header-bg: #f0f0f0;
  --header-color: #222;
  --bg-color: white;
  --text-color: black;
}

body.dark-mode {
  --header-bg: #222;
  --header-color: #ddd;
  --bg-color: #121212;
  --text-color: #eee;
}

/* 应用主题颜色 */
.app-container {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.app-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
  font-size: 1.2em;
  color: #555;
}

.separator {
  margin: 0 5px;
}

/* Flashcard 样式 */
.flashcard-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  user-select: none;
}

.flashcard {
  width: 300px;
  height: 180px;
  perspective: 1000px;
  cursor: pointer;
  margin-bottom: 10px;
  color: black;
}

.card-content {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  line-height: 180px;
  font-size: 2em;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-content.flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.back {
  transform: rotateY(180deg);
}

.card-index {
  font-size: 1em;
  color: #888;
}

/* 单词列表 */
.card-list {
  margin-top: 20px;
}

.card-list h2 {
  margin-bottom: 10px;
}

.card-row {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.word-pair {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.examples {
  margin-top: 5px;
  font-size: 0.9em;
  color: #555;
}

.french-example,
.english-example {
  margin: 2px 0;
}


.flashcard-viewer {
  user-select: none;
  width: 300px;
  margin: auto;
  text-align: center;
}

.flashcard {
  width: 300px;
  height: 180px;
  perspective: 1000px;
  cursor: pointer;
  margin-bottom: 10px;
}

.card-content {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card-content.flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #f0f0f0;
}

.face.back {
  transform: rotateY(180deg);
  background: #e0e7ff;
}

.card-index {
  margin-bottom: 10px;
  font-weight: bold;
}

.navigation-buttons button {
  margin: 0 10px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #666;
  background: #fff;
  cursor: pointer;
  color: black;
}

.navigation-buttons button:hover {
  background: #ddd;
  color: black;
}
</style>
