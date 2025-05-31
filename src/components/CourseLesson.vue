<template>
  <header class="app-header">
    <a class="username" href="https://yushanwang9801.github.io" target="_blank" rel="noopener noreferrer">
      <span class="username-text">YushanWang9801</span>
      <span class="username-icon">→</span>
    </a>
  </header>

  <div class="container">
    <button class="menu-toggle" @click="toggleSidebar" v-show="isMobile && !sidebarOpen">☰ Courses</button>

    <div class="sidebar course-list" :class="{ open: sidebarOpen }">
      <h2 class="title">Courses</h2>
      <ul>
        <li v-for="key in courseKeys" :key="key" :class="{ active: key === selectedCourse }" @click="selectCourse(key)">
          {{ courseMap[key] }}
        </li>
      </ul>
    </div>

    <div class="content lesson-list" :class="{ open: !sidebarOpen }">
      <button class="back-button" v-if="isMobile" @click="toggleSidebar">← Back to Courses</button>
      <h2 class="title">{{ selectedCourse ? courseMap[selectedCourse] : 'Select A Course' }}</h2>

      <ul v-if="lessons.length">
        <li v-for="lesson in lessons" :key="lesson" @click="selectLesson(lesson)">
          {{ lesson }}
        </li>
      </ul>

      <div class="empty-state" v-else>
        <div class="empty-icon">📚</div>
        <h3>No Course Selected</h3>
        <p>Please select a course from the sidebar to view lessons</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CourseLesson',
  setup() {
    const router = useRouter()
    const courseMap = ref({})
    const courseKeys = ref([])
    const selectedCourse = ref(null)
    const lessons = ref([])
    const sidebarOpen = ref(true)

    const COURSE_FOLDER_PATH = './data'

    async function loadCourseFiles() {
      try {
        const res = await fetch(`${COURSE_FOLDER_PATH}/index.json`)
        const data = await res.json()
        courseMap.value = data
        courseKeys.value = Object.keys(data)
      } catch (error) {
        console.error('加载课程失败:', error)
      }
    }

    async function selectCourse(course) {
      selectedCourse.value = course
      lessons.value = []
      sidebarOpen.value = false  // 选课后，移动端切换显示课时列表

      try {
        const res = await fetch(`${COURSE_FOLDER_PATH}/${course}.json`)
        const data = await res.json()
        lessons.value = Object.keys(data)
      } catch (error) {
        console.error(`加载课程 ${course} 的课时失败:`, error)
      }
    }

    function selectLesson(lesson) {
      router.push(`/lesson/${selectedCourse.value}-${lesson}`)
    }

    function toggleSidebar() {
      sidebarOpen.value = !sidebarOpen.value
    }

    // 判断是否移动端 (简单写法，真实项目推荐用window.matchMedia)
    const isMobile = computed(() => window.innerWidth <= 768)

    onMounted(() => {
      loadCourseFiles()
    })

    return {
      courseMap,
      courseKeys,
      selectedCourse,
      lessons,
      sidebarOpen,
      selectCourse,
      selectLesson,
      toggleSidebar,
      isMobile,
    }
  },
}
</script>

<style>
:root {
  --primary-color: #00a19c;
  --primary-light: #040505;
  --secondary-color: #3f37c9;
  --text-color: #2b2d42;
  --text-light: #8d99ae;
  --background: #ffffff;
  --border-radius: 12px;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 8px 15px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Header Styles */
.app-header {
  color: var(--primary-color);
  padding: 1rem 2rem;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.username {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
}

.username:hover {
  opacity: 0.9;
}

.username-icon {
  font-size: 0.9rem;
  opacity: 0.7;
  transition: var(--transition);
}

.username:hover .username-icon {
  transform: translateX(3px);
}

.container {
  padding-top: 60px;
  height: calc(100vh - 60px);
  max-width: 900px;
  margin: 0 auto;
  display: flex;
}

ul {
  list-style: none;
  padding-left: 0;
}

.title {
  padding-left: 20px;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

/* 课程列表 固定宽度 */
.sidebar.course-list {
  width: 250px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  padding-left: 20px;
}

/* 课时列表 占剩余空间 */
.content.lesson-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  padding-left: 20px;
}

/* 激活课程高亮 */
.course-list li.active {
  font-weight: bold;
  background-color: #eee;
  cursor: pointer;
}

/* 课程和课时列表项都加个悬停指针 */
.course-list li,
.lesson-list li {
  cursor: pointer;
  padding: 5px 10px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  color: var(--text-light);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.empty-state p {
  max-width: 300px;
  line-height: 1.5;
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-button:hover {
  background-color: #e0e0e0;
}

.prev-button {
  margin-right: auto;
}

.next-button {
  margin-left: auto;
}

/* 移动端隐藏侧边栏（课程列表），只显示一个切换按钮 */
@media (max-width: 768px) {
  .container {
    padding-top: 50px;
    height: calc(100vh - 50px);
    flex-direction: column;
  }

  .sidebar.course-list {
    width: 100%;
    height: calc(100vh - 40px);
    border-right: none;
    position: fixed;
    top: 50px;
    left: 0;
    background: white;
    z-index: 1000;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.course-list.open {
    transform: translateX(0);
  }

  .content.lesson-list {
    padding: 10px;
    margin-top: 40px;
    display: none;
  }

  .content.lesson-list.open {
    display: block;
  }

  .menu-toggle {
    width: 100%;
    height: 40px;
    font-size: 20px;
    padding-left: 20px;
  }

  .back-button {
    margin-bottom: 10px;
  }

  .lesson-navigation {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-button {
    width: 100%;
  }
}
</style>