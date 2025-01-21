import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserDateStore = defineStore('userData', () => {
  const likeList = ref(new Map())
  const addLikedMusic = (musicData) => {
    if (!musicData) return
    const { currSongId } = musicData
    //添加喜欢音乐的数据至Map中 id -> data
    if (!likeList.value.has(currSongId))
      likeList.value.set(currSongId, musicData)
    // console.log(likeList.value)
    else likeList.value.delete(currSongId, musicData)
  }
  return {
    likeList,
    addLikedMusic,
  }
})
