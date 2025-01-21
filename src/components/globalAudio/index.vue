<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useAudioStore } from '@/store/audio/index.js'
import { storeToRefs } from 'pinia';
import emitter from '@/utils/emitter.js'
import useUserData from '@/store/user/index.js'
const userData = useUserData()
const { userInfo } = storeToRefs(userData)

const audioStore = useAudioStore()
const emits = defineEmits(['playEnd', 'playPause', 'playStart', 'getCurrTime', 'nextSong'])
const props = defineProps({
    volume: {
        type: Number,
        default: 0.5
    }
})
const audio = ref()
const { currTime, volume, currSongId, musicUrl, audioSwitch } = storeToRefs(audioStore)
//全局事件总线，可供其他组件修改播放时间
emitter.on('controlCurrTime', (time) => {
    setCurrTime(time)
})
const setCurrTime = (time) => {
    if (audio.value) {
        console.log('播放时间被修改', time);
        audio.value.currentTime = time
        // audio.value?.play()
    }
}

watch(musicUrl, async (url) => {
    //🟥切换歌曲自动播放
    // setTimeout操作解释：可能时播放器没有及时加载，所以切换下一首歌数据，并且设置开关打开audioSwitch.value = true,不能自动播放，于是设置延时任务，延时操作audioSwitch = true达到播放效果
    setTimeout(() => {
        // 只有用户手动播放一次后，后续才能次次都自动播放
        if (audioStore.userFirstPlay) {
            audioSwitch.value = true
            audio.value?.play()
        }
    }, 1000)
})
//监听播放器状态
watch(audioSwitch, () => {
    // 浏览器安全策略，不能初始就播放音乐,只有用户首次打开音频后，后续的音频才允许自动播放
    audioStore.userFirstPlay = true
    //切换歌曲时，开关会在playList组件中关闭 -> 打开 一趟，并且包在了setTimeout函数中，目的就是为了等待播放器加载，这里也是为了解决：切换歌曲太快导致的播放器加载不及时，导致无法播放
    nextTick(() => {
        audioSwitch.value ? audio.value?.play() : audio.value?.pause()
    })
})
watch(volume, (value) => {
    if (audio.value)
        audio.value.volume = Math.max(0, Math.min(1, value))
})

// 发送请求获取下一首歌曲的消息
watch(currSongId, async () => {
    musicUrl.value = audioStore.musicUrl
})


onMounted(async () => {
    console.log('🟥🟥🟥🟥', audioStore)
    await audioStore.changeSong(currSongId.value)
    init()
})

//初始化函数
const init = async () => {
    //播放器初始设置为0,防止刷新报错
    audio.value.currentTime = 0
    audio.value.volume = audioStore.volume
    //✨添加timeupdate事件回调，歌词条修改播放时间修改时触发
    //通过播放时间 -> 修改歌词、容器的style样式
    audio.value.addEventListener('timeupdate', () => {
        currTime.value = audio.value ? audio.value.currentTime : 0
        audioStore.setCurrTime(currTime.value)
    })
    audio.value.addEventListener('ended', async () => {
        console.log('play END');
        //播放结束，设置状态，防止handleScroll再次触发scroll又滚回底部
        // container.value.scrollTop = 0
        // emits('playEnd')
        // await emitter.emit('changeSong', 2)
    })
    audio.value.addEventListener('pause', () => {
        console.log("pause");
        // emits('playPause')
    })
    // audio.value.addEventListener('play', () => {
    //     console.log("play");
    //     emits('playStart')
    // })
}
//暴露方法
defineExpose({
    setCurrTime,
})

</script>

<template>
    <!-- 解决：用户退出到登录界面后，仍然继续播放，用户退出后，播放器不显示  -->
    <audio ref="audio" :src="musicUrl" class="globalaudio" controls></audio>
</template>

<style scoped lang='scss'>
.globalaudio {
    display: none;
    // position: absolute;
    // top: 0;
    // left: 40%;
}
</style>