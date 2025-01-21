/**
 * 主要管理播放器 audio 相关数据
 *   如：当前歌曲信息，其他歌曲信息、歌曲歌词、歌曲封面、歌曲播放状态
 */
import { defineStore } from 'pinia'
import { ref, toRaw, watch, computed } from 'vue'
import emitter from '@/utils/emitter.js'
import imgAPI from '@/api/music/imgdata/index.js'
//获取歌曲数据
import songAPI from '@/api/music/songLryic/index.js'
let { ipcRenderer } = require('electron')

//保存当前播放歌曲信息，以及对歌曲信息的处理操作
export const useAudioStore = defineStore('audio', () => {
  //当前歌曲id
  const currSongId = ref(12)
  const currTime = ref(5)
  const volume = ref(0.1)
  const totalSongLen = ref(0)
  const currSongTextInfo = ref({
    title: '',
    author: '',
    otherInfo: '10000 words omitted here',
    ablum: '111P',
    source: '2024/4/8',
  })
  const currSongTotalTime = ref(0)
  const lyricData = ref('')
  //用户首次播放，为了满足浏览器对于播放器的策略，首次打开播放器不可以自动播放
  const userFirstPlay = ref(false)
  const musicUrl = ref({})
  // 播放器开关
  const audioSwitch = ref(false)
  const getCurrTime = () => currTime.value
  const setCurrTime = (time) => {
    currTime.value = time
  }

  /**音量控制 */
  const setVolume = (vol, flag) => {
    if (flag == 'up') {
      volume.value += 0.05
    } else if (flag == 'down') {
      volume.value -= 0.05
    }

    if (vol) volume.value = vol
  }

  // 控制播放器开关状态
  const changeSwitch = (value) => {
    if (!value) {
      audioSwitch.value = !audioSwitch.value
    } else if (typeof value == 'boolean') {
      audioSwitch.value = value
    }
  }
  watch(audioSwitch, () => {
    ipcRenderer.send('lyric-switch-state', toRaw(audioSwitch.value))
  })

  //获取当前音乐总时长
  const getMusicTotalTime = (musicURL) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(musicURL)
      // 加载音频文件以获取总时长
      audio.addEventListener('loadedmetadata', function () {
        resolve(audio.duration) // 获取音频文件的总时长，单位为秒
      })
    })
  }

  /**
   * 切换歌曲时触发
   * 🟥处理指定id歌曲的歌词数据、mp3数据、歌曲相关信息
   * @param {Number} currSongId
   */
  const getSongData = async (id) => {
    const { data: r } = await songAPI.getSongInfo(id)
    const { songName, author, time, mp3URL, lyric } = r
    const name = `${songName}-${author}.mp3`
    const encodedName = encodeURIComponent(name)
    const musicUrl = songAPI.getSongMp3Url(encodedName)

    //整理歌词数据
    const lyricData = handleLyricData(lyric)
    const songInfo = {
      currSongId: id,
      musicUrl: musicUrl,
      lyricData,
      totalTime: time,
      currSongTextInfo: {
        otherInfo: 'My first independent project , 10000 words omitted here 😂',
        ablum: '111P',
        source: '2024/4/8',
        author: author,
        title: songName,
      },
    }
    // console.log('songInfo', songInfo)
    return songInfo
  }

  /**
   * 处理歌词数据 String -> [[单条歌词数据],[单条歌词数据],.....]
   * @return Array<{id,time,words,formatTime}>
   */
  const handleLyricData = (data) => {
    // console.log('❓❓❓❓', data)
    const r = data
      .split('\n')
      .filter((i) => i)
      .map((i, index) => {
        const parts = i.split(']')
        const words = parts[1]
        //✨时间换算
        //[01:06.11] => Array:[01, 06.11] => 1*60 + 06.11 => 66.11
        const timeParts = parts[0].replace('[', '').split(':')
        const time = +timeParts[0] * 60 + +timeParts[1]
        const formatTime = timeParts[0] + ':' + timeParts[1].slice(0, 2)
        return {
          id: index,
          formatTime,
          time,
          words,
        }
      })
    const r1 = r
      .filter((i) => i.words !== '')
      .map((i, idx) => {
        return {
          id: idx,
          formatTime: i.formatTime,
          time: i.time,
          words: i.words,
        }
      })
    // console.log(r1);
    // console.log(r.filter(i => i.words !== ''));
    return r1
  }

  //当前封面背景图id
  const currSongCoverImgID = ref(0)
  const songCoverImg = ref(
    new URL(imgAPI.getRadarPicture('main-radarList-img1.jpg'), import.meta.url)
  )
  const currPlayModel = ref(0)

  /**
   * 🟥切换歌曲
   * flag = 0 || 无参数：打开界面初始歌曲
   * flag = 1 上一首
   * flag = 2 下一首
   * flag = '' && id  歌曲id:x的歌曲
   * @param { '' || 1 || 2 } flag
   */
  const changeSong = async (flag, id) => {
    let prevId = currSongId.value
    let prevCoverId = currSongCoverImgID.value

    //下一首
    if (flag == 1) {
      currSongCoverImgID.value -= 1
      currSongId.value -= 1
      if (currSongId.value < 0) currSongId.value = 16
      if (currSongId.value == 12) currSongId.value = 11
      if (currSongCoverImgID.value <= -1) currSongCoverImgID.value = 7
    }
    //上一首
    else if (flag == 2) {
      currSongCoverImgID.value += 1
      currSongId.value += 1
      if (currSongId.value > 16) currSongId.value = 0
      if (currSongCoverImgID.value >= 8) currSongCoverImgID.value = 0
    }
    //指定歌曲id
    else if (flag == '') {
      currSongCoverImgID.value += 1
      if (currSongCoverImgID.value >= 8) currSongCoverImgID.value = 0
      currSongId.value = id
    }

    // 再次判断当前播放模式
    // 0 -> 列表循环
    // 1 -> 随机播放
    // 2 -> 单曲循环
    switch (currPlayModel.value) {
      case 0: {
        break
      }
      case 1: {
        let randomIndex = -1
        randomIndex = Math.floor(Math.random() * totalSongLen.value)
        while (randomIndex == prevId) {
          randomIndex = Math.floor(Math.random() * totalSongLen.value)
        }
        currSongId.value = randomIndex
        break
      }
      case 2: {
        console.log('重复播放')
        currSongId.value = prevId
        currSongCoverImgID.value = prevCoverId
        emitter.emit('controlCurrTime', 0)
        break
      }
    }

    //切换封面,并计算相关颜色
    songCoverImg.value = new URL(
      imgAPI.getRadarPicture(
        `main-radarList-img${currSongCoverImgID.value + 1}.jpg`
      ),
      import.meta.url
    )

    // console.log('currSongCoverImgID', currSongCoverImgID.value)
    // 🟥当前歌曲切换后，处理歌曲信息 -> 获取歌曲数据,并且保存数据
    const r = await getSongData(currSongId.value)

    musicUrl.value = r.musicUrl

    lyricData.value = r.lyricData
    currSongTotalTime.value = r.totalTime
    currSongTextInfo.value = r.currSongTextInfo
  }

  // 监听音乐url变化，更新歌曲信息
  watch(musicUrl, () => {
    let primitiveData = toRaw(currSongTextInfo.value)
    ipcRenderer.send('update-song-info', {
      currSongTextInfo: primitiveData,
    })
  })

  ipcRenderer.on('lyric-handle-switch', () => {
    changeSwitch()
  })

  ipcRenderer.on('lyric-change-song', (event, flag) => {
    changeSong(flag)
  })

  /**
   * 实时获取时间用于获取currTime，并传递给musicFooter组件
   * @param {Number} time
   */
  watch(currTime, () => {
    // 播放结束,切换下一首歌曲
    if (currTime.value >= currSongTotalTime.value) {
      console.log('播放结束,切换下一首歌曲', currPlayModel.value)
      changeSong(2)
    } else {
      // ipcRenderer.send('update-song-currtime', currTime.value)
      let currIndex =
        lyricData.value.findIndex((i) => i.time > currTime.value) - 1
      let primitiveObj = toRaw(lyricData.value[currIndex])
      ipcRenderer.send('update-song-word', {
        lyricData: primitiveObj,
      })
    }
  })

  function reset() {
    audioSwitch.value = false
    currTime.value = 0
    currSongId.value = 0
    currSongCoverImgID.value = 0
    currSongTextInfo.value = {}
    lyricData.value = []
    musicUrl.value = {}
    currSongTotalTime.value = 0
  }

  return {
    volume,
    musicUrl,
    currPlayModel,
    currTime,
    currSongTextInfo,
    audioSwitch,
    userFirstPlay,
    currSongId,
    lyricData,
    currSongTotalTime,
    currSongCoverImgID,
    songCoverImg,
    totalSongLen,
    setCurrTime,
    setVolume,
    getCurrTime,
    changeSwitch,
    getMusicTotalTime,
    getSongData,
    changeSong,
    handleLyricData,
    reset,
  }
})
