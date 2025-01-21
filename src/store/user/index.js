import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getUserInfoAPI } from '@/api/user/index.js'
import router from '@/router/index.js'
const useUserData = defineStore('use', () => {
  //当为ture时，表示可以退出，否则默认都是false，因为推出前需要做一些操作，比如comment组件中需要发送请求，将点赞的评论消息上传到服务器
  const canLogout = ref(true)
  //退出登录前需要执行的任务
  const promiseArr = ref([])
  const userInfo = ref({
    username: '',
    password: '',
    userStatus: '',
    userId: -1,
  })
  const getUserInfo = async () => {
    const res = await getUserInfoAPI({
      username: localStorage.getItem('username'),
    })
    if (res?.code == 200) {
      userInfo.value.userId = res.data[0].id
      userInfo.value.userStatus = res.data[0].userStatus
      userInfo.value.username = res.data[0].username
      console.log('userInfo', userInfo.value)
      return true
    }
  }
  const clearUserInfo = () => {
    userInfo.value = {
      username: '',
      password: '',
      userStatus: '',
      userId: -1,
    }
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }
  const searchContext = ref('')
  return {
    userInfo,
    promiseArr,
    canLogout,
    searchContext,
    getUserInfo,
    clearUserInfo,
  }
})

export default useUserData
