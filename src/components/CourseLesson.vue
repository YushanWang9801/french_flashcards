<template>
  <div class="container">
    <!-- 移动端菜单按钮 -->
    <button class="menu-toggle" @click="sidebarOpen = !sidebarOpen">
      ☰ Courses
    </button>

    <!-- 左侧课程菜单 -->
    <div class="sidebar" :class="{ open: sidebarOpen }">
      <h2 class="title">Courses</h2>
      <ul class="course-list">
        <li
          v-for="course in courses"
          :key="course"
          :class="['course-item', { active: course === selectedCourse }]"
          @click="selectCourse(course)"
        >
          {{ course }}
        </li>
      </ul>
    </div>

    <!-- 右侧课节内容 -->
    <div class="content">
      <h2 class="title">{{ selectedCourse || '...' }}</h2>
      <ul class="lesson-list" v-if="lessons.length">
        <li
          v-for="lesson in lessons"
          :key="lesson"
          class="lesson-item"
          @click="openFlashCard(selectedCourse, lesson)"
        >
          {{ lesson }}
        </li>
      </ul>
      <div v-else class="empty">Select a course to view its lessons.</div>

      <!-- 新增：FlashCardViewer 区域 -->
      <div class="flashcard-container" v-if="flashcards.length > 0">
        <h3 class="title">Flashcards for {{ selectedLesson }}</h3>
        <FlashCardViewer :cards="flashcards" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import FlashCardViewer from '../components/FlashCardViewer.vue'
import Footer from '../components/Footer.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLesson(id) {
  router.push(`/lesson/${id}`)
}

export default {
  name: 'CourseLesson',
  components: {
    FlashCardViewer,
    Footer,
  },
  data() {
    return {
      courses: ['800 hundred Words With Lea', 'Taxi A1', 'Taxi A2'],
      selectedCourse: null,
      lessons: [],
      sidebarOpen: false,
      selectedLesson: null, // 当前选中课节
      flashcards: [],      // 对应 flashcard 数据
    };
  },
  methods: {
    selectCourse(course) {
      this.selectedCourse = course;
      this.sidebarOpen = false;
      this.selectedLesson = null;
      this.flashcards = [];
      this.fetchLessons(course);
    },
    fetchLessons(course) {
      const mockLessonData = {
        '800 hundred Words With Lea': ['l1', 'l2', 'l3'],
        'Taxi A1': ['a1_l1', 'a1_l2'],
        'Taxi A2': ['a2_l1', 'a2_l2', 'a2_l3'],
      };
      this.lessons = mockLessonData[course] || [];
    },
    openFlashCard(course, lesson) {
        this.$router.push({ name: 'FlashCardViewer', params: { id: lesson } });
    }
  },
};
</script>

<style scoped>
/* 全局容器 */
.container {
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #0b1c2c;  /* 🎨 页面背景色，可自定义 */
  color: white;
}

/* 左侧菜单按钮（移动端显示） */
.menu-toggle {
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  background-color: #1e3a5f;  /* 🎨 按钮背景色 */
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  z-index: 1001;
  border-radius: 5px;
  cursor: pointer;
}

/* 左侧栏 */
.sidebar {
  width: 250px;
  background-color: #132c4c;  /* 🎨 左侧栏背景 */
  padding: 20px;
  border-right: 1px solid #1e3a5f;  /* 🎨 边框颜色 */
  transition: transform 0.3s ease;
}

.course-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.course-item {
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: background 0.2s;
}

.course-item:hover {
  background-color: #1f4d7a;  /* 🎨 悬停背景色 */
}

.course-item.active {
  background-color: #357edd;  /* 🎨 激活背景色 */
}

/* 右侧内容区域 */
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.lesson-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.lesson-item {
  padding: 12px;
  margin-bottom: 10px;
  background-color: #1a2d48;  /* 🎨 lesson 默认背景 */
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

.lesson-item:hover {
  background-color: #284a75;  /* 🎨 lesson 悬停背景 */
}

.empty {
  color: #ccc;
  margin-top: 20px;
  font-style: italic;
}

/* Flashcard Viewer 区域 */
.flashcard-container {
  margin-top: 30px;
}

/* 小屏幕适配 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 250px;
    transform: translateX(-100%);
    z-index: 1000;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .menu-toggle {
    display: block;
  }

  .content {
    padding: 80px 20px 20px;
    width: 100%;
  }
}
</style>
