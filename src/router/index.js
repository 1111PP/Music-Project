import { createRouter, createWebHashHistory } from 'vue-router'
import pinia from '@/store/index.js'
import useUserData from '@/store/user/index.js'
//进度条插件
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/view/layout/index.vue'),
      redirect: '/main',
      children: [
        {
          //🟥优先匹配
          path: '/main',
          component: () => import('@/view/layout/main/index.vue'),
        },
      ],
    },
    // {
    //   path: '/main',
    //   component: () => import('@/view/layout/main/index.vue'),
    // },
  ],
})

//
router.beforeEach(async (to, from, next) => {
  // NProgress.start()
  // let token = localStorage.getItem('token')
  // //token 存在
  // if (token !== null && token !== '') {
  //   //防止登录后跳转登录页
  //   if (to.path === '/login') {
  //     next('/layout/home')
  next()
  //   }
  //   //token存在,检测用户是否刷新,但用户信息丢失
  //   else {
  //     const userData = useUserData(pinia)
  //     //刷新后pinia中数据丢失,重新获取用户信息
  //     if (userData.userInfo.username !== '') {
  //       next()
  //     } else {
  //       //携带token获取用户信息
  //       const r = await userData.getUserInfo()
  //       next()
  //     }
  //   }
  //   }
  //   //token不存在
  //   else {
  //     if (to.path === '/login') next()
  //     else {
  //       console.log('token不存在')
  //       next('/login')
  //     }
  //   }
})

router.afterEach((to, from) => {
  //进度条结束
  // NProgress.done()
})

export default router
