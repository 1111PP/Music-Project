import router from '@/router/index.js'
import pinia from '@/store/index.js'
import useUserData from '@/store/user/index.js'
const userData = useUserData(pinia)
// import { verifyTokenAPI, getUserInfoAPI } from '@/api/user/index.js'

router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem('token') || ''
  // token 不存在
  if (token == '') {
    if (to.path == '/login') next()
    else {
      console.log('token不存在')
      next('/login')
    }
  }
  // token 存在
  else {
    if (to.path == '/login') {
      next('/main')
      //
    } else {
      // 如果用户信息存在，则直接跳转
      if (userData.userInfo.username) {
        next()
        // 如果用户信息不存在，则重新请求
      } else {
        //页面被刷新，用户身份信息不存在,需要重新请求
        const r = await userData.getUserInfo({
          username: localStorage.getItem('username') || '',
        })
        if (r) next()
      }
    }
  }
})

router.afterEach((to, from) => {
  //进度条结束
  // NProgress.done()
})
