import { defineStore } from 'pinia'
import { ref } from 'vue'
import getThemeColor from '@/utils/vividColor'

export const useSongsStore = defineStore('songs', () => {
  //轮播图数据
  const loopPictureData1 = new Array(8).fill(8).map((i, idx) => {
    return {
      id: idx,
      url: new URL(
        `../../../public/main-slideshow-img-${idx + 1}.png`,
        import.meta.url
      ),
    }
  })
  ///main-radarList-img1.jpg
  //  const imgUrlList = new Array(8).fill(null).map((i, idx) =>
  // `../../../public/main-songList-bg${idx + 1}.jpg`
  // )
  //推荐歌单的假数据
  const songListData1 = async (imgUrlList) => {
    const func = async () => {
      const imgList = new Array(8)
        .fill(null)
        .map(
          (i, idx) =>
            new URL(
              `../../../public/main-songList-bg${idx + 1}.jpg`,
              import.meta.url
            )
        )
      // ✨等待所有图片的主题色计算完毕
      const themeColorList = await Promise.all(
        imgList.map(async (url) => await getThemeColor(url))
      )
      return new Array(8).fill(null).map((i, idx) => {
        return {
          id: idx,
          title: '推荐歌单',
          url: imgList[idx],
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
      const imgList = new Array(8)
        .fill(null)
        .map(
          (i, idx) =>
            new URL(
              `../../../public/main-radarList-img${idx + 1}.jpg`,
              import.meta.url
            )
        )
      // ✨等待所有图片的主题色计算完毕
      const themeColorList = await Promise.all(
        imgList.map(async (url) => await getThemeColor(url))
      )
      console.log(themeColorList)
      return new Array(8).fill(null).map((i, idx) => {
        return {
          id: idx,
          title: '推荐歌单',
          url: imgList[idx],
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
