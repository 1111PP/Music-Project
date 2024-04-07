import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getUserInfoAPI } from '@/api/user/index.js'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
const useUserData = defineStore('use', () => {
  const tokenInfo = ref({
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  })
  const userInfo = ref({
    username: '',
    id: -1,
  })
  const getUserInfo = async () => {
    const r = await getUserInfoAPI()
    if (r.code === 200) {
      userInfo.id = r.data.id
      userInfo.username = r.data.username
    } else {
    }
  }
  return {
    userInfo,
    getUserInfo,
  }
})

export default useUserData
