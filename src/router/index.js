import { createRouter, createWebHashHistory } from 'vue-router'

// import App from '../App.vue'

const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/music'
  },
  // 定义音乐路由规则
  {
    path: '/music',
    name: 'music',
    component: () => import('../Mobile/views/Music/Music.vue')
  },
  // 定义歌单详情路由规则
  {
    path: '/playlist/detail',
    name: 'playlist-detail',
    component: () => import('../Mobile/components/music/detail.vue')
  },
  // 定义歌单评论路由规则
  {
    path: '/comment/playlist',
    name: 'comment-playlist',
    component: () => import('../Mobile/components/music/playlistcomment.vue')
  },
  // 定义音乐详情路由规则
  {
    path: '/song/detail',
    name: 'song-detail',
    component: () => import('../Mobile/components/music/songdetail.vue')
  },
  // 定义视频路由规则
  {
    path: '/video',
    name: 'video',
    component: () => import('../Mobile/views/Video/Video.vue')
  },
  // 定义天气路由规则
  {
    path: '/weather',
    name: 'weather',
    component: () => import('../Mobile/views/Weather/Weather.vue')
  },
  // 定义我的路由规则
  {
    path: '/user',
    name: 'user',
    component: () => import('../Mobile/views/User/User.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
