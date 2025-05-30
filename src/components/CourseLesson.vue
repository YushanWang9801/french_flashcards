<template>
  <header class="app-header">
    <a class="username" href="https://yushanwang9801.github.io" target="_blank" rel="noopener noreferrer">
      YushanWang9801
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
      <h2 class="title">{{ selectedCourse ? courseMap[selectedCourse] : '请选择课程' }}</h2>

      <ul v-if="lessons.length">
        <li v-for="lesson in lessons" :key="lesson" @click="selectLesson(lesson)">
          {{ lesson }}
        </li>
      </ul>

      <div v-else>请选择课程以查看课时。</div>
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
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  background-color: var(--header-bg);
  color: var(--header-color);
  font-weight: bold;
  font-size: 1.2rem;
}


.username {
  user-select: none;
  color: #00A19C;
  text-decoration: none;
}

.username:hover {
  text-decoration: none;
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
}
</style>