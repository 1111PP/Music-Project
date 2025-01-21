<!-- 外部的音乐底部栏 -->
<!-- 
    组件的功能:
    1.进度条显示和控制  -> 当前播放时间 和 控制播放时间事件
    2.开关的显示和控制  -> 播放状态 和 控制当前播放状态
    3.音量显示和控制    -> 当前音量 和 控制音量事件
    4.播放歌曲的控制    -> 自定义事件,因为切换歌曲changSong是在父组件playList中
    5.接收数据  ->  1.主题色数据  2.总时长数据 
-->

<script setup>
import {
  ref,
  nextTick,
  computed,
  onMounted,
  toRaw,
  watch,
} from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioStore } from '@/store/audio/index.js'
import emitter from '@/utils/emitter.js'
import { useRouter } from 'vue-router'
import songAPI from '@/api/music/songLryic/index'
import { formatTime } from '@/utils/formatTime.js'
import { useUserDateStore } from '@/store/userData/index.js'
import imgAPI from '@/api/music/imgdata/index.js'
const audioStore = useAudioStore()
const router = useRouter()


const userData = useUserDateStore()
const { likeList } = storeToRefs(userData)
const toComment = () => {
  router.push('/comment')
}
const toPlaying = () => {
  router.push('/playing')
}
//当前进度
const {
  currTime,
  currPlayModel,
  volume,
  totalSongLen,
  currSongId,
  audioSwitch,
  songCoverImg,
  musicUrl,
  currSongTextInfo,
  currSongTotalTime,
} = storeToRefs(audioStore)

const allSongList = ref([])
const handleSwitch = () => {
  // 🟥从pinia仓库中取出，因为它还需要供很多组件使用
  audioStore.changeSwitch()
}

const playModel = ref([
  { icon: 'svgListPlay', id: 0 },
  { icon: 'svgRandomPlay', id: 1 },
  { icon: 'svgLoopPlay', id: 2, width: '27px', height: '27px' },
])
const changePlayModel = () => {
  currPlayModel.value += 1
  if (currPlayModel.value >= playModel.value.length) {
    currPlayModel.value = 0
  }
  // console.log(currPlayModel.value)
}

const changeCurrTime = (time) => emitter.emit('controlCurrTime', time)
const prevSong = () => audioStore.changeSong(1)
const nextSong = () => audioStore.changeSong(2)

const isShowWillPlayList = ref(false)
const showWillPlayList = () => {
  isShowWillPlayList.value = !isShowWillPlayList.value
}
const changeSongByList = (id) => {
  if (currSongId.value == id) return
  audioStore.changeSong('', id)
}
//当前歌曲滚动至歌曲列表中间
let itemRef = ref()
const openDrawer = () => {
  nextTick(() => {
    // console.log(itemRef.value);
    const target = itemRef.value.find((i) =>
      Array.from(i.classList).includes(`item-${currSongId.value}`)
    )
    // console.log(target);
    target.scrollIntoView({
      block: 'center',
    })
  })
}
const isLiked = computed(() => {
  return likeList.value.has(currSongId.value)
})
const addLike = async () => {
  const r = await audioStore.getSongData(currSongId.value)
  userData.addLikedMusic(r)
}
const getRandomImg = () => {
  // 随机数字：1-8
  const randomIndex = Math.floor(Math.random() * 8) + 1
  return new URL(imgAPI.getMainPicture(`main-songList-bg${randomIndex}.jpg`), import.meta.url)
}
onMounted(async () => {
  //获取所有音乐数据渲染播放列表，同时先获取到所有音乐的总时长
  const { data: r } = await songAPI.getSongInfo()
  allSongList.value = r.map(i => ({ ...i, imgUrl: getRandomImg() }))
  // 顺便记录音乐库中的歌曲数量
  totalSongLen.value = r.length
})

const { ipcRenderer } = require('electron')

function downloadMusic(fileName) {
  // 移除之前的事件监听器，避免每次下载都注册一个download-status事件
  ipcRenderer.removeAllListeners('download-status')

  //触发download-music事件，下载文件
  ipcRenderer.send('download-music', { fileName })

  ipcRenderer.on('download-status', (event, { status, savePath, msg }) => {
    if (status === 'success') {
      alert(`下载成功！保存至：${savePath} `)
    } else {
      alert('下载失败：' + msg)
    }
  })
}

let handleDownload = async (i) => {
  const { musicUrl, currSongTextInfo } = i
  let filename = musicUrl.split('/').slice(-1)[0]
  //electron事件
  // 1.文件相对路径传递../../../ public / musicMp3 / 保留 - 郭顶.mp3
  // 2.文件名称
  downloadMusic(filename)
}

let openLyricDialog = () => {
  //打开子窗口
  ipcRenderer.send('open-lyric-dialog')
}
onMounted(() => {
  //子窗口准备完毕后触发
  ipcRenderer.on('child-ready-to-show', () => {
    // console.log('子窗口准备显示');
    // 🟥初始化子窗口的开关状态
    ipcRenderer.send('lyric-switch-state', toRaw(audioSwitch.value))
  })
})
const tapeImg = new URL('@public/tape.jpg', import.meta.url)
const tape = ref()

</script>

<template>
  <div class="lp-out-footer-container" ref="lp">
    <!-- 底部主体区域 -->
    <div class="lp-out-footer-main" :style="{
      backgroundColor: `#FAFAFA`,
    }">
      <div class="lp-out-footer-left">
        <div @click="toPlaying" class="circleBox tape-rotate" ref="tape"
          :style="{ animationPlayState: audioSwitch ? 'running' : 'paused' }">
          <img class="blackTrack" :src="tapeImg" />
          <img class="playingImg" :src="songCoverImg" alt="" />
        </div>
        <div class="rightBox">
          <div class="songInfo">
            <span class="songName">
              {{ currSongTextInfo.title + '&nbsp;-&nbsp;' }}
            </span>
            <span class="singer"> {{ currSongTextInfo.author }}</span>
          </div>
          <div class="control">
            <svgMysicCollect class="collect" height="25px" width="25px" color="#7C828F" />
            <div class="comment" @click="toComment">
              <span class="commentCount">999+</span>
              <svgComment height="25px" width="25px" color="#7C828F" />
            </div>
            <svgTransmit color="#7C828F" />
            <svgDownload @click="() =>
              handleDownload({
                currSongTextInfo,
                musicUrl,
              })
              " color="#7C828F" />
          </div>
        </div>
      </div>
      <div class="lp-out-footer-middle">
        <div class="control">
          <svgLove @click="addLike" height="25px" class="" width="25px" :color="isLiked ? 'red' : '#50586A'" />
          <svgPrevSong @click="prevSong" class="prevSong" height="30px" width="30px" color="#50586A" />
          <!-- 开关 -->
          <div class="switch" @click="handleSwitch()">
            <svgTriangle v-show="!audioSwitch" color="white" height="30px" width="30px" />
            <svgContinue v-show="audioSwitch" color="white" height="25px" width="25px" />
          </div>
          <svgNextSong @click="nextSong" class="nextSong" height="30px" width="30px" color="#50586A" />
          <div class="will-play-model" @click="changePlayModel">
            <component class="play-model-icon" color="#9095A0" v-show="currPlayModel == i.id" v-for="i in playModel"
              :is="i.icon" :key="i.id" :width="i.width ? i.width : '20px'" :height="i.height ? i.height : '20px'">
            </component>
          </div>
        </div>
        <div class="progressBarBox">
          <div class="currtime">{{ formatTime(currTime) }}</div>

          <!-- 🟥播放器滑块 -->
          <div class="progressBar">
            <el-slider @change="changeCurrTime" :show-tooltip="false" class="progress" v-model="currTime"
              :max="currSongTotalTime" />
          </div>

          <div class="totaltime">{{ formatTime(currSongTotalTime) }}</div>
        </div>
      </div>
      <div class="lp-out-footer-right">
        <svgWords color="#7C828F" @click="openLyricDialog" />
        <svgVipVolume height="25px" width="25px" color="#7C828F" />
        <svgWillPlayList @click="showWillPlayList" color="#7C828F" />
        <div class="volume">
          <div class="volumeIcon">
            <svgVolume height="25px" v-show="!volume == 0" width="25px" color="#7C828F" />
            <svgNoVolume v-show="volume == 0" height="25px" width="25px" color="#7C828F" />
          </div>
          <el-slider class="volume-range" v-model="volume" :show-tooltip="false" :min="0" :max="0.5"
            :step="0.01"></el-slider>
        </div>
      </div>
    </div>
    <!-- <audio ref="audio" src="" class="audio"></audio> -->
    <el-drawer size="399px" :lock-scroll="false" class="elDrawer" :show-close="false" v-model="isShowWillPlayList"
      @open="openDrawer">
      <template #header>
        <div class="header-drawer">
          <div class="playlist">播放列表{{ allSongList.length }}</div>
          <div class="manageList" style="margin-right: 6%">
            <div class="collectAll" style="margin-right: 15px">
              <svgCollect style="margin: 0" color="#84878c" />收藏
            </div>
            <div class="deleteAll">
              <el-icon>
                <Delete />
              </el-icon>
              清空
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <!-- {{ allSongList }} -->
        <ul class="songlist">
          <li @click="changeSongByList(item.id)" :class="`item-song item-${item.id}`" v-for="item in allSongList"
            :key="item.id" ref="itemRef" :style="{
              backgroundColor:
                currSongId == item.id ? 'rgba(128, 128, 128, 0.398)' : '',
            }">
            <!-- {{ item.songName }} -->
            <div class="cover">
              <img class="coverImg" :src="item.imgUrl" alt="">
              <!-- 开关 -->
              <div v-if="currSongId == item.id" class="switch" @click="handleSwitch()">
                <svgTriangle v-show="!audioSwitch" color="white" height="20px" width="20px" />
                <svgContinue v-show="audioSwitch" color="white" height="20px" width="20px" />
              </div>
            </div>
            <div class="song-info">
              <div class="songName">{{ item.songName }}</div>
              <div class="singer">{{ item.author }}</div>
            </div>
            <div class="song-time">{{ formatTime(item.time) }}</div>
          </li>
        </ul>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.tape-rotate {
  animation: rotate 30s linear infinite;
}

.header-drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .playlist {
    font-size: 18px;
    font-weight: 700;
    margin-left: 5%;
  }

  .manageList {
    display: flex;
    align-items: center;

    .collectAll {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }

    .deleteAll {
      display: flex;
      align-items: center;
    }
  }
}

.songlist {
  height: 100%;
  overflow-y: scroll;
  padding-left: 0px;
  padding-top: 10px;

  .item-song {
    display: flex;
    align-items: center;
    height: 65px;
    position: relative;

    &:hover {
      background-color: rgba(128, 128, 128, 0.1);
    }

    .cover {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 10px;
      margin-left: 10px;
      overflow: hidden;


      .coverImg {
        width: 100%;
        height: 100%;
      }

      .switch {
        position: absolute;
        top: 53%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .song-info {
      margin-left: 10px;

      .songName {
        margin: 6px 0 3px 0;
        font-size: 15px;
        color: black;
      }

      .singer {
        font-size: 12px;
        color: #84878c;
      }
    }

    .song-time {
      position: absolute;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      font-size: 13px;
      color: #84878c;
    }
  }
}

.lp-out-footer-container {
  height: 78px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-flow: column;
  z-index: 999;
  border-top: 1px solid rgb(212, 212, 212);

  .lp-out-footer-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;

    .lp-out-footer-left {
      position: absolute;
      left: 32px;
      display: flex;
      align-items: center;
      height: 100%;

      .circleBox {
        position: relative;
        height: 65px;
        width: 65px;
        border-radius: 50%;
        background-color: rgba(146, 146, 146, 0.171);
        border: 1px solid rgba(254, 254, 254, 0.053);
        z-index: 1;

        .blackTrack {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 100%;
          width: 100%;
          background-size: 90% 90%;
          border-radius: 50%;
          background-color: black;
          z-index: 2;
        }

        .playingImg {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 65%;
          width: 65%;
          border-radius: 50%;
          z-index: 3;
        }
      }

      .rightBox {
        margin-left: 12px;
        margin-top: 5px;

        .songInfo {
          display: flex;
          align-items: center;
          margin-bottom: 3px;

          .songName {
            font-size: 16px;
          }

          .singer {
            color: gray;
          }
        }

        .control {
          display: flex;
          align-items: center;

          .collect {}

          .comment {

            margin-top: 5px;
            position: relative;

            .commentCount {
              position: absolute;
              right: -5px;
              top: -5px;
              font-size: 10px;
              color: #7c828f;
              font-weight: 700;
              // background-color: red;
            }
          }

          .collect {
            // margin-left: 30px;
          }
        }
      }
    }

    .lp-out-footer-middle {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-left: 16px;
      margin-top: 10px;
      // margin-top: 10px;
      // width: 100%;
      // height: 100%;

      .control {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;

        .prevSong {}

        .nextSong {}

        .switch {
          display: flex;
          align-items: center;
          background-color: #fa3d48;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 0 5px;
        }

        .switch:active {
          transform: scale(0.95);
          background-color: rgba(137, 3, 3, 1);
        }

        .switch:hover {
          transform: scale(1.1);
          background-color: rgb(255, 38, 38);
        }

        .will-play-model {
          display: flex;
          align-items: center;
          width: 25px;

          .play-model-icon {}
        }
      }

      .progressBarBox {
        display: flex;
        align-items: center;
        margin-top: -5px;
        color: gray;
        font-size: 10px;
        // height: 5px;

        .progressBar {
          margin-top: 0px;
          width: 300px;
          // background-color: #FA3D48;
          margin: 0 10px;
          border-radius: 2.5px;
        }
      }
    }

    .lp-out-footer-right {
      position: absolute;
      right: 0px;
      height: 100%;
      // width: 300px;
      top: 0; // flex: 3;
      display: flex;
      // justify-content: end;
      align-items: center;

      .volume {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .volumeIcon {
          margin-top: 3px;
          margin-right: -6px;
        }

        .volume-range {
          width: 80px;
          height: 100%;
        }
      }
    }
  }

}

//抽屉外层蒙版
:deep(.el-overlay) {
  background-color: rgba(0, 0, 0, 0);
  position: fixed; // 添加固定定位
  width: 100vw;
  height: 100vh; // 修改为100vh
  left: 0;
  top: 0; // 修改定位
  // 移除margin             
}

//蒙版内的抽屉实体
:deep(.el-drawer) {
  // 👇样式bug   1.弹窗打开闪烁到页面中间
  // margin-top: 130px;
  // margin-bottom: 20px;

  position: fixed; // 添加固定定位
  // 移除margin
  top: 130px; // 使用top定位
  height: calc(100% - 33%); //保证底部的阴影展示出来
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 0;
  bottom: 0px
}

:deep(.el-drawer__header) {
  height: 50px;
  padding: 0;
}

:deep(.el-drawer__body) {
  padding: 0px;
  overflow: hidden;
}

//滑块大盒子
:deep(.el-slider__runway) {
  margin-left: 3px;
  background-color: rgba(165, 163, 163, 0.505);
  // border-radius: 5px;
  height: 5px;
}

//滑块小圆圈按钮
:deep(.el-slider__button) {
  height: 10px;
  width: 10px;
  border: none;
  opacity: 0;
}

//被滑过的背景
:deep(.el-slider__bar) {
  background-color: #696969;
  border-radius: 5px;
  height: 5px;
}

:deep(.el-slider:hover .el-slider__bar) {
  background-color: #959595;
}

:deep(.el-slider:hover .el-slider__button) {
  opacity: 1;
}

:deep(.progress > .el-slider__runway > .el-slider__bar) {
  background-color: #fa3d48;
}
</style>
