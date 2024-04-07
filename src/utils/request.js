//axios基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserData from '@/store/user/index.js'
import router from '@/router/index.js'
import { getUserInfoAPI, getAllCommentAPI } from '@/api/user/index.js'
import { refreshTokenAPI, isRefreshReuqest } from '@/utils/refreshToken.js'
// 创建axios实例
const request = axios.create({
  //开发环境
  baseURL: '/api',
  //生产环境
  // baseURL: 'http://47.236.176.127:1200',
  //请求体中携带token
  // headers: {
  //   Authorization = `Bearer ${token}`
  // }
})

// axios请求拦截器
request.interceptors.request.use(
  (config) => {
    //自动携带token
    const token = localStorage.getItem('token')
    if (token !== null && token !== '') {
      config.headers.token = token
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
request.interceptors.response.use(
  async (res) => {
    const data = res.data
    if (data.code === 2003) {
      alert('Token is Missing')
      router.replace('/login')
      return
    }
    //token失效,优先进行长短token替换,利用长token重新请求数据
    //如果长token请求也失效,说明长短token都失效,返回登录页
    //elseif中第二个条件必须说明:不能用于处理长token失效的请求,如果长token也失效了.那么又带着长token发送请求,随后又返回code===2004的响应,进入下面条件，就会无限循环
    else if (data.code === 2004 && !isRefreshReuqest(res.config)) {
      console.log('刷新:短token')
      const r = await refreshTokenAPI()
      //刷新到新的短token了。重新请求
      if (r?.code === 200) {
        console.log(r)
        const r1 = await getUserInfoAPI()
        const r2 = await getAllCommentAPI()
      } else {
        console.log('双token全部失效')
        alert('token失效，请重新登录')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        router.replace('/login')
        return
      }
    }
    //响应结果中若包含token信息,则在此处保存长短token信息
    if (data.data.shortToken) {
      localStorage.setItem('token', data.data.shortToken)
    }
    if (data.data.refreshToken) {
      localStorage.setItem('refreshToken', data.data.refreshToken)
    }
    return data
  },
  (e) => {
    // const userStore = useUserStore() //token失效调用其中的clearUserInfo方法清除本地用户数据
    // //统一错误提示（如登录密码错误显示）
    // ElMessage({
    //   type: 'warning',
    //   message: e.response.data.message,
    // })
    // //401 token失效处理（token失效时，会报401错误状态码表示token失效）
    // // 1.清除本地存储的用户数据
    // if (e.response.status === 401) {
    //   userStore.clearUserInfo()
    //   // 导入router是因为在js文件中，useRouter是在.vue文件中！！！！所以这里导入router！！
    //   //useRouter是一个Vue 3中的Composition API函数，它只能在Vue 3组件的setup函数中使用
    //   router.push('/login')
    // }
    // // 2.跳转到登录页
    // return Promise.reject(e)
  }
)

export default request
