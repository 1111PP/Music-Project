<script  setup>
import { ref, onMounted, computed, nextTick, toRefs, reactive, watch } from 'vue'
import { vhToPx } from '@/utils/pxToVh.js'
import settingInfo from '@/setting.js'
const props = defineProps({
    totalData: {
        type: Array,
        default: () => []
    },
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 150
    }
})
const emits = defineEmits(['change'])
let totalData = ref(props.totalData)
const container = ref()
const box = ref()
const imgs = ref()
let currIndex = ref(0)
//计算轮播图的宽高比例，方便后续保持响应式
const rate = ref(props.width / props.height)
//图片宽度，初始为传入的props.width，后续在onMounted根据屏幕尺寸进行调整
let elWidth = ref(props.width)
let timer = null
let picCount
//设置两张首位赋值轮播图
const initFirstAndEnd = () => {
    totalData.value.unshift({
        id: 123,
        url: totalData.value[totalData.value.length - 1].url,
        text: ''
    })
    totalData.value.push({
        id: 345,
        url: totalData.value[1].url,
        text: ''
    })
    picCount = totalData.value.length
}

function liOver(index) {
    emits('change', index); //触发外部传递的change事件
    currIndex.value = index + 1;
    move(currIndex.value);
    clearInterval(timer);
}
const liOut = () => {
    loopPicture()
}

const move = (index) => {
    if (box.value) {
        //l为偏移量
        // ✨15*(index+1)是因为要加上margin-right:15的间隙
        let l = index * elWidth.value + 15 * (index + 1)
        box.value.style.transform = `translateX(${-l}px)`
        box.value.style.transition = '0.5s'
        currIndex.value = index
    }
}
//移动指定index的轮播图函数
const leftMove = (index) => {
    if (currIndex.value - 1 === 0) {
        box.value.style.transform = `translateX(-100%))`
        //👇2行：瞬间无过度的移动至最后一张🈯辅助轮播图
        box.value.style.transform = `translateX(${-elWidth.value * (picCount - 1)}px)`
        box.value.style.transition = 'none'
        // '强制渲染2'
        box.value.clientHeight
        //👇1行：继续轮播最后一张轮播图
        move(picCount - 2)
    } else {
        move(currIndex.value - 1)
    }
}
//移动指定index的轮播图函数
// 🟥🟥🟥关键步骤:制造错觉，当轮播到最后一张图片时，会理解无过渡效果的移动到最左侧辅助轮播图上，随后move(1)继续轮播第一张
const rightMove = (index) => {
    // if 轮播到最后一张图片
    if (currIndex.value === picCount - 2) {
        box.value.style.transform = `translateX(100%)`//此时存在过渡效果，移动最后一张轮播图
        //并瞬间移动至最左侧的🈯辅助轮播图
        box.value.style.transform = `translateX(${0}px)`
        box.value.style.transition = 'none'//过渡取消
        // 🈯box.clientHeight会强制渲染，就是让过渡为none的这次过渡行为立即失效
        // 🟥🟥🟥如果不强制渲染，则最右轮播图切换到最左侧辅助轮播图时还是会有过渡效果，这是因为没有渲染导致的，box.style.transition = 'none'还没有生效就又被move中设置了过渡效果
        box.value.clientHeight
        // move(1)继续轮播第一张
        move(1)
    } else {
        move(currIndex.value + 1)
    }
}

const loopPicture = () => {
    timer = setInterval(() => {
        // leftMove(currIndex.value)
        rightMove(currIndex.value)
    }, 2000)
}

// 防抖id
let timeId
onMounted(() => {
    //先渲染两个辅助轮播图
    initFirstAndEnd()
    //初始展示第一张轮播图
    move(1)
    //开始轮播
    loopPicture()
    //🟥nextTick是为了等待initFirstAndEnd执行完毕，两张辅助轮播图渲染结束后，在整体对所有轮播图处理，调整轮播图的尺寸，让他们保持响应式
    nextTick(() => {
        // 🟥整个应用打开后的初始宽度为1130px，这是定死的，所以这个轮播组件应该也保持同样的宽度比例，大概在35vw宽度,在这个初始屏幕下首先转化轮播图px单位 -> vw值，随后赋值给图片的width
        let width = (props.width / settingInfo.INITSCREENWIDTH).toFixed(2) * 100
        //1.先设置轮播图width宽度为vw单位
        imgs.value.forEach(i => { i.style.width = `${width}vw` })
        //2.此时width为vw单位是动态的,因此可以根据width值动态调整height,来回转化可能考虑到 vw -> px 的精度问题,统一单位再通过比例计算height的px值
        let computedHeight = Math.max(vhToPx(imgs.value[0].style.width) / rate.value, props.height)
        //3.然后再计算图片宽度,赋值,这是为了防止刷新后尺寸的bug
        imgs.value.forEach(i => { i.style.height = `${computedHeight}px` })
        //4.让外层容器也保持同样的尺寸
        container.value.style.width = `${width}vw`
        container.value.style.height = `${computedHeight}px`
        //5.重新设置elWidth，它主要用作计算偏移长度❗不能直接赋值props.width，因为vw转化为px会有转换后的精度问题，🟥我要的是横向拉长时width也会随着比例变化
        elWidth.value = vhToPx(width)
        //6.手动移动轮播图,防止出现轮播图片错位的bug
        move(currIndex.value)

        //绑定屏幕resize事件,动态调整轮播图组件的尺寸
        window.addEventListener('resize', () => {
            //屏幕缩放时先让轮播图停止循环
            clearInterval(timer);
            if (timeId) {
                clearTimeout(timeId)
            }
            timeId = setTimeout(() => {
                //动态计算width的px值
                let width = vhToPx(imgs.value[0].style.width)
                //重新计算imgs的高度
                let computedHeight = Math.max(width / rate.value, props.height)
                //重新为高度赋值即可，width为vw单位，无需改变
                if (imgs.value) {
                    //等比例缩放高度
                    imgs.value.forEach(i => {
                        i.style.height = computedHeight + 'px'
                    })
                    //外层容器保持同样的尺寸
                    container.value.style.height = `${computedHeight}px`
                }
                //调整屏幕后重新设置偏移量
                elWidth.value = width
                //❓调整窗口后会导致只显示半张/不完整的轮播图，而且只有下一次轮播才会恢复正常，所以直接执行move函数让他移动到调整窗口那一刻的轮播图位置
                move(currIndex.value)
                //继续开始循环
                loopPicture()
            }, 100)
        })
    })

})

</script>

<template>
    <div class="container" ref="container">
        <div class="box" ref="box">
            <img ref="imgs" :src="item.url" class="imgs" v-for="item in totalData" :key="item.id">
        </div>
        <ul class="ul" ref="ul">
            <li v-for="item in totalData.slice(1, picCount - 1)" :key="item.id"
                :class="{ active: currIndex - 1 === item.id }" @mouseenter="liOver(item.id)" @mouseleave="liOut()">
            </li>
        </ul>
    </div>
</template>

<style scoped lang='scss'>
.active {
    background-color: white;
}

.container:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(60, 60, 60, 0.397);
    z-index: 99;
}

.container {
    position: relative;
    overflow: hidden;
    border-radius: 10px;

    .box {
        display: flex;
        width: 9999px;
        height: 100px;

        /* transition: .5s; */
        .imgs {
            border-radius: 10px;
            /* 🟥轮播图中的间隙*/
            margin-left: 15px;
            border: none;
            overflow: hidden;
            background: no-repeat;
            background-size: 100% 100%;
        }
    }
}


ul {
    z-index: 999;
    position: absolute;
    display: flex;
    top: 85%;
    left: 50%;
    transform: translateX(-50%);

    li {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        margin: 0 5px;
        background-color: rgba(145, 145, 145, 0.461);
        list-style: none;
    }
}
</style>
