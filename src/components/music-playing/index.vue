<!-- 🟥🟥🟥声明:     2024/05/11 19:55
     ❌ 这个组件时有bug的，2s内连续的调整播放时间过程中，首次会立即滚动到歌词处，但2s内再次
    调整时，无法立即滚动到歌词处，因为首次滚动后就处于节流状态了,再次调整时间还是处于节流，只有2s后节流停止，才
    会再次滚动到歌词处
   
    因为是手动控制滚动条来来形成歌词滚动效果的：scrollTop = offsetTop
    所以这会触发滚动事件scroll，但是用户自己也要滚动来查看歌词，也会触发滚动事件
    我定义的滚动事件回调中做了这些操作：先暂停自动滚动，用户停止滚动后，此时如果当前处于暂停状态，则2000ms后回到当前歌词处

    暂停状态下调整时间时，💡由于初始isStopOffset=false，所以会走setStatus函数中autoScroll函数完成滚动，但随即
    就触发滚动事件回调函数，于是它又走了一遍滚动逻辑，虽然显示上没有问题，但实际多执行了很多次scrollTop = offsetTop操作

    .....由于这两个滚动事件重叠操作，除此之外还有很多bug，但总体带来的效果上，还是可以接受的，就是没办法立即跳转至修改的歌词处
    暂时先不修复了😅
-->
<!-- 歌词滚动组件实际上是需要实时传递
    1.播放时间currTime(✨相当于拆解了一个v-model)和控制播放时间controlCurrTime操作
    2.歌词数据
    3.播放开关状态
        这是最主要的,其他都不需要,因为歌曲audio应该定义到项目全局,不应该在此组件定义,歌词的滚动,显示只需要根据时间调整,而控制歌词相当于子组件修改父组件数据,于是需要自定义事件,歌词的滚动状态由播放时间和播放开关共同控制
     -->
<script setup>
import { forEach } from 'lodash';
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
    //歌词数据
    lyricData1: {
        type: Array,
        default: []
    },
    //播放状态
    switch: {
        type: Boolean,
        default: false
    },

    // 开启响应式的歌词盒子高度
    responseHeight: {
        type: Number,
        default: 400
    },
    currTime: {
        type: Number,
        default: 0
    },

})
const emits = defineEmits(['playEnd', 'playPause', 'playStart', 'getCurrTime', 'nextSong', 'controlCurrTime'])

//播放器
const audio = ref()
//歌词盒子
const lrc = ref()
//视口展示部分歌词的盒子
const container = ref()
//🟥时间和歌词的总数据
const lyricData = ref(null)
const totalTime = ref(0)
//歌词所占高度大小
let lrcHeight = ref(0)
// 歌词与播放音乐时间匹配，设置样式效果
let currIndex = ref(0)
//当前播放时间
let currTime = ref(0)
//是否停止滚动
let isStopOffset = ref(false)
//容器高度
let containerHeight = ref(400)
//每行歌词高度
let liHeight = 40
// let immediateScroll = ref(false)
const delay = ref(2000)

//切换歌曲
watch(() => props.lyricData1, (newVal) => {
    lyricData.value = props.lyricData1
    nextTick(() => {
        //回到顶部
        container.value.scrollTop = 0
        //由于每首歌的歌词数量不同，所以歌词盒子的尺寸也不同，所以也需要重新设置 歌词展示盒子 和 歌词盒子的高度
        resizeContainerHeight()
    })
}, { immediate: true })

watch(() => props.currTime, () => {
    currTime.value = props.currTime
    // console.log(currTime.value);
    setStatus(currTime.value)
})
// 用户手动滚动事件
//   1.滚动时，停止歌词偏移
//   2.滚动停止超过3s，重新偏移至当前播放歌词处
//防抖处理
let timer = null
const handleScroll = (delay) => {
    //🟥停止自动偏移
    isStopOffset.value = true
    // 若任务没有完成，直接清除
    clearTimeout(timer)
    // //开启下一次
    timer = setTimeout(() => {
        autoScroll()
        // 继续自动偏移
        isStopOffset.value = false
    }, delay)
}

//记录最后一句歌词时间
const lastWordTime = lyricData.value[lyricData.value.length - 1].time
// 歌词偏移逻辑
const autoScroll = () => {
    // console.log(currIndex.value);
    // 🟥自动滚动歌词：偏移量计算
    let currWordTop = liHeight * (currIndex.value + 1) - (liHeight / 2)
    let offsetTop = currWordTop
    // console.log(currWordTop);
    //❗改动:偏移containet右侧的滚动条
    if (offsetTop < 0) return //如果偏移量小于0，则不偏移
    //实现偏移  
    if (container.value) container.value.scrollTop = offsetTop
}
//自动播放时的处理函数
const setStatus = (currTime) => {
    //增加0.8s是为了提前为下一句歌词添加样式
    currTime += 0.8
    //1.去除上一个样式
    //2.添加新的样式
    currIndex.value = lyricData.value.findIndex(i => i.time > currTime) - 1
    // ⚠️特殊情况,歌词轮播完毕，但是时间还没到，属于结尾的部分,应该保持在最底部那一句歌词,此时滚动至最底部
    if (currIndex.value < 0 && currTime > lastWordTime) {
        currIndex.value = lyricData.value.length - 1
    }
    // 用户手动滚动时，歌词自动滚动暂停isStopOffset = false
    if (!isStopOffset.value) {
        //歌词自动滚动
        autoScroll()
    }
}
//点击歌词跳转播放播放位置
const clickLi = (i) => {
    // console.log(i);
    let moveTagTime = i.formatTime.split(':')
    moveTagTime = +moveTagTime[0] * 60 + +moveTagTime[1]
    emits('controlCurrTime', moveTagTime)
}
/**
 * 重新设置 歌词展示盒子 和 歌词盒子的高度
 */
const resizeContainerHeight = () => {
    containerHeight.value = props.responseHeight
    container.value.style.height = containerHeight.value + 'px'
    //重新计算并设置歌词盒子lrc的高度
    lrcHeight.value = lyricData.value.length * liHeight
    const totalHeight = lrcHeight.value + (containerHeight.value / 1.5)
    lrc.value.style.height = totalHeight + 'px'
}

// 歌词展示盒子尺寸变化
watch(() => props.responseHeight, () => {
    nextTick(() => {
        // 重新设置 歌词展示盒子 和 歌词盒子的高度
        resizeContainerHeight()
    })
}, { immediate: true })


onMounted(async () => {
    // 初始化：重新设置 歌词展示盒子 和 歌词盒子的高度
    resizeContainerHeight()
})
</script>

<template>
    <audio class="lp-music-audio" src=""></audio>
    <!-- 将音乐播放器不显示display:none -->
    <div ref="container" @scroll="handleScroll(delay)" class="lp-music-container">
        <ul ref="lrc" class="lp-music-lrc">
            <li class="lp-music-item" v-for="(i, idx) in lyricData" :key="i.index" @click="clickLi(i)">
                <div class="lp-music-words" :class="{ 'lp-music-active': i.id == currIndex }">
                    {{ i.words }}
                </div>
                <div class="lp-music-time">
                    {{ i.formatTime }}
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang='scss'>
.lp-music-audio {
    display: none;
}

.lp-music-active {
    font-size: 25px !important;
    color: white !important;
}

.lp-music-container {
    height: 100%;
    width: 100%;
    margin: 0px auto;
    overflow: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);

    .lp-music-lrc {
        display: flex;
        flex-flow: column;
        justify-content: center;

        .lp-music-item {
            display: flex;
            align-items: center;
            position: relative;
            list-style: none;
            height: 40px;
            line-height: 40px;
            color: #ada8a8;

            .lp-music-words {
                width: 399px;
                font-size: 18px;
                font-weight: 500;
                line-height: 1;
            }

            .lp-music-time {
                position: absolute;
                right: 0%;
                width: 50px;
                height: 15px;
                line-height: 16px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.356);
                border-radius: 10px;
                opacity: 0;
            }

            &:hover {
                color: white;
            }

            &:hover .lp-music-time {
                opacity: 1;
            }
        }
    }
}
</style>