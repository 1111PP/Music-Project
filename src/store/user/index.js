import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getUserInfoAPI } from '@/api/user/index.js'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
const useUserData = defineStore('use', () => {
  return {}
})

export default useUserData
