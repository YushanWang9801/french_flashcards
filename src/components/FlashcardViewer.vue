<template>
  <div class="app-container">

    <header class="app-header">
      <div class="username">YushanWang9801</div>
      <!-- <div class="toggle-switch" @click="toggleDarkMode" :class="{ 'dark': isDark }">
        <div class="toggle-knob"></div>
      </div> -->
    </header>

    <button @click="goBack" class="back-button">← 返回课程</button>

    <!-- 面包屑导航 -->
    <nav class="breadcrumb">
      <span class="course">course N</span>
      <span class="separator"> &gt; </span>
      <span class="lesson">lesson M</span>
    </nav>

    <!-- Flashcard 查看区域 -->
    <section
    class="flashcard-viewer"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- 点击翻转 -->
    <div class="flashcard" @click="toggleFlip">
      <div class="card-content" :class="{ flipped: isFlipped }">
        <div class="face front" v-if="!isFlipped">
          <!-- 显示法语单词 -->
          {{ currentCard.word }}
        </div>
        <div class="face back" v-else>
          <!-- 显示英语翻译 -->
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
      <h2>本课单词</h2>
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
import { ref, computed, watch, onMounted} from 'vue'
import lessonCardsData from '../data/l1.json'
import Footer from './Footer.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cards = ref([])

onMounted(async () => {
  const lesson = route.params.id
  try {
    const module = await import(`../data/${lesson}.json`)
    cards.value = module.default || module
  } catch (e) {
    console.error('加载 flashcard 数据失败:', e)
  }
})

const lessonCards = ref(lessonCardsData)
const currentIndex = ref(0)
const isFlipped = ref(false)

// 获取当前的 flashcard
const currentCard = computed(() => lessonCards.value[currentIndex.value])

// 翻转卡片
const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

// 用于滑动切换卡片，记录触摸起始位置
let touchStartX = 0

const handleTouchStart = (event) => {
  touchStartX = event.changedTouches[0].clientX
}

const handleTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX
  const deltaX = touchEndX - touchStartX

  // 简单判定阈值，50px 内忽略
  const swipeThreshold = 50

  if (deltaX > swipeThreshold) {
    // 往右滑，上一张卡片
    if (currentIndex.value > 0) {
      currentIndex.value--
      isFlipped.value = false
    }
  } else if (deltaX < -swipeThreshold) {
    // 往左滑，下一张卡片
    if (currentIndex.value < lessonCards.value.length - 1) {
      currentIndex.value++
      isFlipped.value = false
    }
  }
}


function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = lessonCards.value.length - 1 // 循环到最后一张
  }
  isFlipped.value = false
}

// 切换到下一张
function nextCard() {
  if (currentIndex.value < lessonCards.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // 循环回第一张
  }
  isFlipped.value = false
}

const isDark = ref(false)
watch(isDark, (newVal) => {
  if (newVal) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
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

/* toggle 开关 */
.toggle-switch {
  width: 40px;
  height: 22px;
  background-color: #ccc;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-switch.dark {
  background-color: #4f46e5;
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
.toggle-switch.dark .toggle-knob {
  left: 20px;
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
.french-example, .english-example {
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

