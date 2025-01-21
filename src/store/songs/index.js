/**
 *
 * 主要管理歌曲 image 相关数据
 *   如：各种图片数据、图片主题色
 *
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import getThemeColor from '@/utils/vividColor'
import API from '@/api/music/imgdata/index.js'
export const useSongsStore = defineStore('songs', () => {
  //轮播图数据
  const loopPictureData1 = async () => {
    const { data: songListImgArr } = await API.getLoopPictureNameArr()

    const r = songListImgArr.map((i, idx) => {
      return {
        id: idx,
        url: new URL(API.getLoopPicture(i), import.meta.url),
      }
    })
    return r
  }

  //推荐歌单的假数据
  const songListData1 = async (imgUrlList) => {
    const func = async () => {
      const { data: songListImgArr } = await API.getMainPictureNameArr()
      // url array
      const imgList = songListImgArr.map(
        (i, idx) => new URL(API.getMainPicture(i), import.meta.url)
      )
      // ✨等待所有图片的主题色计算完毕
      const themeColorList = await Promise.all(
        imgList.map(async (url) => await getThemeColor(url))
      )
      return imgList.map((i, idx) => {
        return {
          id: idx,
          title: '推荐歌单',
          url: i,
          themeColor: themeColorList[idx].split(',').slice(0, -1).join(),
        }
      })
    }
    const r = await func()
    return r
  }

  //雷达歌单的假数据
  const radarSongListData1 = async (imgUrlList) => {
    const func = async () => {
      const { data: radarSongListImgArr } = await API.getRadarPictureNameArr()
      const imgList = radarSongListImgArr.map(
        (i, idx) => new URL(API.getRadarPicture(i), import.meta.url)
      )
      // ✨等待所有图片的主题色计算完毕
      const themeColorList = await Promise.all(
        imgList.map(async (url) => await getThemeColor(url))
      )
      // console.log(themeColorList)
      return imgList.map((i, idx) => {
        return {
          id: idx,
          title: '推荐歌单',
          url: i,
          themeColor: themeColorList[idx].split(',').slice(0, -1).join(),
        }
      })
    }
    const r = await func()
    return r
  }

  return {
    loopPictureData1,
    songListData1,
    radarSongListData1,
  }
})
