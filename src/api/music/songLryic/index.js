import request from '@/utils/request/music.js'
//获取所有死数据

/**
 * 获取歌词
 * @param {Number} id
 * @returns
 */
const getSongInfo = (id) => {
  return request.post('/WY_music/getSongInfo', {
    id,
  })
}

const getSongMp3Url = (name) => {
  return import.meta.env.VITE_NODE_SERVER_STATIC_URL + '/music-mp3/' + name
}

export default {
  getSongInfo,
  getSongMp3Url,
}
