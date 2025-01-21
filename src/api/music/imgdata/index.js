import request from '@/utils/request/music.js'

// 获取轮播图片资源
const getLoopPictureNameArr = () => {
  return request.post('/WY_music/getLoopImg')
}
// 获取首页图片资源
const getMainPictureNameArr = () => {
  return request.post('/WY_music/getMainImg')
}
// 获取雷达歌单图片资源
const getRadarPictureNameArr = () => {
  return request.post('/WY_music/getRadarImg')
}

const static_base_url = {
  loopPicturePath: '/music-loopPicture/',
  mainPicturePath: '/music-mainPicture/',
  radarPicturePath: '/music-radarPicture/',
}

// 后端资源格式 http://localhost:1200/static + 对应资源文件夹名 + 图片名
//http://localhost:1200/static + /music-loopPicture/ + main-slideshow-img-1.png
const getLoopPicture = (name) =>
  import.meta.env.VITE_NODE_SERVER_STATIC_URL +
  static_base_url.loopPicturePath +
  name
const getMainPicture = (name) =>
  import.meta.env.VITE_NODE_SERVER_STATIC_URL +
  static_base_url.mainPicturePath +
  name
const getRadarPicture = (name) =>
  import.meta.env.VITE_NODE_SERVER_STATIC_URL +
  static_base_url.radarPicturePath +
  name

const API = {
  getLoopPictureNameArr,
  getMainPictureNameArr,
  getRadarPictureNameArr,
  getLoopPicture,
  getMainPicture,
  getRadarPicture,
}
export default API
