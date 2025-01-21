//axios基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserData from '@/store/user/index.js'
import router from '@/router/index.js'
import { getUserInfoAPI } from '@/api/user/index.js'
import { refreshTokenAPI, isRefreshReuqest } from '@/utils/refreshToken.js'
const token = localStorage.getItem('token') || ''
// 创建axios实例

const request = axios.create({
  //开发环境
  // baseURL: '/node',
  //生产环境
  // baseURL: 'http://47.236.176.127:1200',
  //✨java大作业后端接口
  baseURL: import.meta.env.VITE_JAVA_SERVER_BASE_API,
  //请求体中携带token
  // headers: {
  // Authorization = `Bearer ${token}`
  // }
})

// axios请求拦截器
request.interceptors.request.use(
  (config) => {
    //自动携带token
    const token = localStorage.getItem('token') || ''
    if (token !== null && token !== '') {
      // ✨自动携带token
      config.headers.token = token
      // console.log(config)
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
request.interceptors.response.use(
  async (res) => {
    res = res.data
    if (res.code === 2003) {
      alert('Token is Missing')
      localStorage.setItem('token', '')
      router.replace('/login')
      return
    }
    //响应结果中若包含token信息,则在此处保存长短token信息
    if (res && res.token) {
      localStorage.setItem('token', res.token)
    }
    return res
  },
  (e) => {
    // const userStore = useUserStore() //token失效调用其中的clearUserInfo方法清除本地用户数据
    // //统一错误提示（如登录密码错误显示）
    ElMessage({
      type: 'warning',
      message: '服务器错误,请稍后再试',
    })
    localStorage.setItem('token', '')
    router.replace('/login')
    return Promise.reject(e)
  }
)

export default request
