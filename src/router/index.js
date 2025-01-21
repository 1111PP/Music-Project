import { createRouter, createWebHashHistory } from 'vue-router'

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
        //用户评论界面
        {
          path: '/comment',
          component: () => import('@/view/mainPages/comment/index.vue'),
        },
        //语言识别
        {
          path: '/speech',
          component: () => import('@/view/mainPages/speech/index.vue'),
        },
        //我喜欢的音乐
        {
          path: '/mylove',
          component: () => import('@/view/mainPages/mylove/index.vue'),
          redirect: '/mylove/songlist',
          children: [
            {
              path: 'songlist',
              component: () =>
                import('@/view/mainPages/mylove/songlist/index.vue'),
            },
            {
              path: 'mylove-comment',
              component: () =>
                import('@/view/mainPages/mylove/comment/index.vue'),
            },
            {
              path: 'collecter',
              component: () =>
                import('@/view/mainPages/mylove/collecter/index.vue'),
            },
          ],
        },
        //设置
        {
          path: '/setting',
          component: () => import('@/view/mainPages/setting/index.vue'),
        },
      ],
    },
    //沉浸式音乐播放界面
    {
      path: '/playing',
      component: () => import('@/view/playList/index.vue'),
    },
    {
      path: '/login',
      component: () => import('@/view/login/index.vue'),
    },
    {
      path: '/lyrics-dialog',
      component: () => import('@/view/windowPages/lyric-dialog/index.vue'),
    },
  ],
})

export default router
