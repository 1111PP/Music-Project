<!-- 内部的音乐底部栏 -->

<!-- 
    组件的功能:
    1.进度条显示和控制  -> 当前播放时间 和 控制播放时间事件
    2.开关的显示和控制  -> 播放状态 和 控制当前播放状态
    3.音量显示和控制    -> 当前音量 和 控制音量事件
    4.播放歌曲的控制    -> 自定义事件,因为切换歌曲changSong是在父组件playList中
    5.接收数据  ->  1.主题色数据  2.总时长数据 
-->

<script setup>
import { ref, toRefs, reactive, nextTick, computed, onMounted, watch, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia';
import { useAudioStore } from '@/store/audio/index.js'
import emitter from '@/utils/emitter.js'

const audioStore = useAudioStore()

const emits = defineEmits(['playPause', 'controlCurrTime', 'playContinue', 'playEnd', 'nextSong', 'prevSong'])
const props = defineProps({
    themeColor: {
        type: String,
        default: 'black'
    },
    totalTime: {
        type: Number,
        default: 0
    },
    audioSwitch: {
        type: Boolean,
        default: false,
    },
    currTime: {
        type: Number,
        default: 0
    },
    volume: {
        type: Number,
        default: 0.1
    },
    //type:0 外部界面时Footer 
    //type:1 内部沉浸式界面时Footer
    type: {
        type: Number,
        default: 1
    }
})

const progressBar = ref()
//进度条当前每段增长长度
const partWidth = ref(0)
const totalTime = ref(0)
//当前进度
const { currTime, audioSwitch, volume } = storeToRefs(audioStore)
const screenWidth = () => {
    return document.body.clientWidth
}
//监控总时长
watch(() => props.totalTime, () => {
    // console.log('totalTime', props.totalTime);
    totalTime.value = props.totalTime
    totalTime.value = (totalTime.value + 1).toFixed(0)
    partWidth.value = screenWidth() / totalTime.value
}, { immediate: true })


//根据当前时间修改进度条
watch(currTime, () => {
    handleProgressWidth(currTime.value)
})
//控制进度条长度
const handleProgressWidth = (second) => {
    //秒数+1是为了弥补进度条长度不够，导致进度条无法完全填满屏幕
    const formatTime = Math.floor(second + 1)
    const totalWidth = partWidth.value * formatTime
    progressBar.value.style.width = totalWidth + 'px'
}
//手动控制进度条
const handleProgress = (e) => {
    const currTime = e.clientX / partWidth.value
    handleProgressWidth(currTime)
    //控制播放时间
    emits('controlCurrTime', currTime)
}

const handleSwitch = () => {
    // 🟥从pinia仓库中取出，因为它还需要供很多组件使用
    audioStore.changeSwitch()
}

const currPlayModel = ref(2)
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
}

//格式化时间
const formatTime = (time) => {
    //这里是为了填坑，父组件playList中播放结束会额外currTime + 5s,这是为了让进度条横向的填满屏幕，所以这里需要对传入的currTime进行约束，始终保持不大于totalTime
    time = Math.floor(Number(time))
    if (time > totalTime.value) time = totalTime.value - 1
    // console.log('time', time);
    let minute = Math.floor(time / 60)
    let second = Math.floor(time % 60)
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return `${minute}:${second}`
}
const prevSong = () => {
    emits('prevSong')
}
const nextSong = () => {
    emits('nextSong')
}
/**
 * 进度条渐变颜色效果变亮
 */
const lightThemeColor = computed(() => {
    const colorArr = props.themeColor.split(',')
    colorArr.forEach((i, idx) => colorArr[idx] = Math.min(255, +colorArr[idx] + 30))
    const lightColor = colorArr.join()
    return lightColor
})
</script>

<template>
    <div class="footer-container">
        <!-- 进度条 -->
        <div class="progressBarBox" @click="handleProgress($event)">
            <!-- 进度条渐变颜色效果 -->
            <div class="progressBar" :style="{
                background: `linear-gradient(to right, rgba(108, 108, 108, 0.07) 0%, rgba(${lightThemeColor},1) 100%)`
            }" ref="progressBar"></div>
        </div>

        <!-- 底部主体区域 -->
        <div class="music-footer-main" :style="{
            backgroundColor: `rgba(${lightThemeColor},0.1)`,
        }">
            <div class="music-footer-left">
                <svgMysicCollect class="collect" height="25px" width='25px' color="#B8B8B8" />
                <div class="comment">
                    <span class="commentCount">999+</span>
                    <svgComment height="25px" width='25px' color="#B8B8B8" />
                </div>
                <svgTransmit color="#B8B8B8" />
                <svgDownload color="#B8B8B8" />
                <div class="time">
                    {{ formatTime(currTime) }}
                    / {{ formatTime(totalTime - 1) }}
                </div>
            </div>

            <div class="music-footer-middle">
                <svgLove height="25px" class="" width='25px' color="#B8B8B8" />
                <svgPrevSong @click="prevSong" class="prevSong" height="30px" width='30px' color="#B8B8B8" />
                <!-- 开关 -->
                <div class="switch" @click="handleSwitch()">
                    <svgTriangle v-show="!audioSwitch" color="white" height="30px" width="30px" />
                    <svgContinue v-show="audioSwitch" color="white" height="25px" width="25px"
                        style="margin-top: 2px;" />
                </div>
                <svgNextSong @click="nextSong" class="nextSong" height="30px" width='30px' color="#B8B8B8" />
                <div class="will-play-model" @click="changePlayModel">
                    <component class="play-model-icon" color="#B8B8B8" v-show="currPlayModel == i.id"
                        v-for="i in playModel " :is="i.icon" :key="i.id" :width="i.width ? i.width : '20px'"
                        :height="i.height ? i.height : '20px'">
                    </component>
                </div>
            </div>
            <div class="music-footer-right">
                <svgWords color="#B8B8B8" />
                <svgVipVolume height="25px" width='25px' color="#B8B8B8" />
                <svgWillPlayList color="#B8B8B8" />
                <div class="volume">
                    <div class="volumeIcon">
                        <svgVolume height="25px" v-if="!volume == 0" width='25px' color="#B8B8B8" />
                        <svgNoVolume v-else="volume == 0" height="25px" width='25px' color="#B8B8B8" />
                    </div>
                    <el-slider class="volume-range" v-model="volume" :show-tooltip="false" :min="0" :max="0.5"
                        :step="0.01"></el-slider>
                </div>
            </div>
        </div>
        <audio ref="audio" src="" class="audio"></audio>
    </div>
</template>

<style scoped lang='scss'>
.audio {
    display: none;
}

.footer-container {
    --progressBarWidth: 5px;
    height: 90px;
    width: 100vw;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-flow: column;
    z-index: 999;

    .progressBarBox:hover .progressBar {
        transform: scale(1.2);
    }

    .progressBarBox {
        height: 10px;
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;

        //进度条小圆球
        &:hover .progressBar:before {
            content: "";
            position: absolute;
            top: -50%;
            right: 0;
            width: 10px;
            height: 10px;
            background-color: rgb(255, 255, 255);
            border-radius: 50%;
        }

        .progressBar {
            position: relative;
            width: 0px;
            height: var(--progressBarWidth);
            border-radius: 2.5px;
            transform-origin: right center;
            transition: all 0.1s;
        }
    }

    .music-footer-main {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .music-footer-left {
            flex: 3;
            display: flex;
            align-items: center;

            .comment {
                margin-top: 5px;
                position: relative;

                .commentCount {
                    position: absolute;
                    right: -5px;
                    top: -5px;
                    font-size: 10px;
                    color: #B8B8B8;
                    font-weight: 700;
                    // background-color: red;
                }
            }

            .collect {
                margin-left: 30px;
            }

            .time {
                margin-left: 15px;
                color: #B8B8B8
            }
        }

        .music-footer-middle {
            flex: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;

            .prevSong {}

            .nextSong {}

            .switch {
                display: flex;
                align-items: center;
                background-color: rgba(210, 210, 210, 0.15);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 0 5px;
            }

            .switch:active {
                transform: scale(0.95);
                background-color: rgba(210, 210, 210, 0.1);
            }

            .switch:hover {
                background-color: rgba(234, 234, 234, 0.1);
            }


            .will-play-model {
                display: flex;
                align-items: center;
                width: 45px;

                .play-model-icon {}
            }


        }

        .music-footer-right {
            flex: 3;
            display: flex;
            justify-content: end;
            align-items: center;

            .volume {
                display: flex;
                align-items: center;
                margin-right: 20px;

                .volumeIcon {
                    margin-top: 3px;
                    margin-right: -6px
                }

                .volume-range {
                    width: 80px;
                    height: 100%;
                }
            }
        }
    }
}

//滑块大盒子
:deep(.el-slider__runway) {
    margin-left: 3px;
    background-color: rgba(86, 86, 86, 0.505);
    // border-radius: 5px;
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
    background-color: #828282;
    border-radius: 5px;
}

:deep(.el-slider:hover .el-slider__bar) {
    background-color: #dadada;
}

:deep(.el-slider:hover .el-slider__button) {
    opacity: 1;
}
</style>