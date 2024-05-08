<script  setup>
import { ref, watch, nextTick } from 'vue'
import { useElementBounding } from '@vueuse/core'
const props = defineProps({
    bgColor: {
        typeof: String,
        default: '#fff'
    },
    visible: {
        typeof: Boolean,
        default: false
    }
})
//开启弹窗方式true
//  1.点击下拉按钮
//关闭弹窗方式false
//  2.点击下拉按钮
//  3.点击!dialog区域
const dialog = ref()
let xStart = ref(0)
let xEnd = ref(0)
let yStart = ref(0)
let yEnd = ref(0)
const emits = defineEmits(["closeDialog"])
//监听dialog的显示状态
const dialogStatus = ref(false)
//获取dialog的坐标信息
const getDialogSite = () => {
    let elWidth = dialog.value.clientWidth
    let elHeight = dialog.value.clientHeight
    const elSite = dialog.value.getBoundingClientRect()
    //🟥这里需要注意？因为我设置了变换的位置transform-origin：top center来设置动画效果，所以获取到的元素都是以上中部分为参考点的，所以elSite.left不再是元素的左上角位于屏幕左侧的距离。实际上是获取元素上中位置到左侧的距离，所以需要修正一下，减去width的一般
    let halfelWidth = Math.floor(elWidth / 2)
    //
    xStart.value = elSite.left - halfelWidth  //elSite.left ~ elSite.left+elWidth
    xEnd.value = elSite.left + halfelWidth
    yStart.value = elSite.top //elSite.top ~ elSite.top+elHeight
    yEnd.value = elSite.top + elHeight
}

//修改 退出登录 文本和svg的样式
const hanldClick = (e) => {
    // console.log('click');
    let xSite = e.clientX
    let ySite = e.clientY
    console.log(xSite, ySite);
    //dialog以外区域点击就会关闭
    if (!(xSite < xEnd.value && xSite > xStart.value && ySite < yEnd.value && ySite > yStart.value)) {
        dialogStatus.value = false
        emits("closeDialog")
        // console.log('close');
    }
}
//监听父组件的弹窗状态
watch(() => props.visible, () => {
    dialogStatus.value = props.visible
})
//监听dialogStatus的值，为true时添加事件监听，为false时移除事件监听
watch(() => dialogStatus.value, () => {
    //唯一设置为true的方式，为true时在此添加事件监听
    if (dialogStatus.value) {
        //当弹窗渲染到页面时再去计算其坐标信息
        nextTick(() => {
            // console.log('nextTick');
            getDialogSite()
        })
        //让点击事件等待dialog出现后再绑定，不然点击打开弹窗的按钮，就会立马触发刚刚click，随后随后click回调中判断点击位置为dialog区域外部，结果会立马关闭dialog
        setTimeout(() => {
            document.addEventListener('click', hanldClick)
        }, 0)
    }
    // 当弹窗值修改为false时，移除监听
    else
        document.removeEventListener('click', hanldClick)
})
</script>

<template>
    <div ref="dialog" :style="{ backgroundColor: bgColor }" class="dialog" v-show="dialogStatus">
        <slot></slot>
    </div>
</template>

<style scoped lang='scss'>
.dialog {
    position: fixed;
    height: 410px;
    width: 360px;
    border-radius: 20px;
    right: 10%;
    top: 55px;
    border: 1px solid rgb(211, 208, 208);
    animation: open 0.2s;
    transform-origin: top center;
    z-index: 999;
}

@keyframes open {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>