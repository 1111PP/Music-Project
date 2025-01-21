<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue'
const props = defineProps({
    outHeight: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    },
    listData: {
        type: Array,
        default: () => []
    },
    drawerSwitch: {
        type: Boolean,
    }
})

const listData = ref(props.listData)
//记录展示列表中第一个的索引
const startIndex = ref(0)
//记录展示列表中最后一个的索引
const endIndex = ref(0)
//虚拟列表可视区域高度
const outHeight = ref(props.outHeight)
//每个列表的高度,可以通过计算获取Math.floor(props.outHeight / props.count)
const listHeight = ref(0)
//整个虚拟列表的偏移量 ↓ 
const offsetDistance = ref(0);
//虚拟列表可视区域能列表数量,
// ⚠️注意是ceil，向上取整，解决出现页面闪烁问题，即使是就是多渲染一个列表，保持滚动时视觉上的连贯性
const visibleCount = ref(0)

//辅助背景 -> 内层div的总高度
const totalHeight = computed(() => listData.value.length * listHeight.value)
//截取指定列表数据
const visibleData = computed(() => {
    // console.log('visibleData', startIndex.value, endIndex.value);
    return listData.value.slice(
        startIndex.value,
        Math.min(endIndex.value, listData.value.length)
    )
})

//记录内层辅助div的滚动卷去的高度变化
const scrollTop = ref(0)

//🟥监测外部父组件容器高度变化，内部的这个虚拟列表高度与父组件容器高度一致
watch(() => props.outHeight, (a, b) => {
    //监测高度变化，随之修改虚拟列表高度变化
    outHeight.value = props.outHeight
    //1.初始化
    //2.以为outHeight列表容器高度变化所牵连的数据修改，单个列表高度、可视区列表数量
    listHeight.value = Math.floor(props.outHeight / props.count)
    visibleCount.value = Math.floor(outHeight.value / listHeight.value)
    // console.log('virtual', listHeight.value);
}, { immediate: true })
//immediate保证虚拟列表组件重新挂载时，都执行一次，解决切换tab后，虚拟列表失效问题


const scrollEvent = (e) => {
    // 获取内层div的滚动被卷去的距离
    scrollTop.value = e.target.scrollTop
    // 根据当前滚动位置计算索引，保存到2个临时变量中
    //startIndexValue获取起始列表索引 = 滚去距离 / 列表高度 ✨向下取整，比如滚动51px时startIndex仍为1
    const startIndexValue = Math.floor(scrollTop.value / listHeight.value)
    const endIndexValue = startIndexValue + visibleCount.value

    // 👇检查滚动位置是否不在列表底部
    //🈯解决滚动到最底部时无限触发滚动事件，导致列表内容不断闪烁，更新的bug
    if (endIndexValue < listData.value.length + 1) {
        // console.log(endIndexValue, listData.value.length);
        startIndex.value = startIndexValue
        endIndex.value = endIndexValue
        // 计算偏移量（防止闪烁跳跃） ↓ 保证偏移单个列表高度整数倍
        offsetDistance.value = scrollTop.value - (scrollTop.value % listHeight.value)
    }
}
onMounted(() => {
    // console.log(1);
    startIndex.value = 0
    endIndex.value = props.count
})
</script>

<template>
    <div v-if="listData.length !== 0" @scroll="scrollEvent" :style="{ height: `${outHeight}px` }"
        class="lp-virtual-container">
        <div :style="{ height: `${totalHeight}px` }" class="lp-virtual-block"></div>
        <ul ref="ul" class="lp-virtual-list" :style="{ transform: `translateY(${offsetDistance}px)` }">
            <li class="lp-virtual-item" v-for="item in visibleData" :key="item.id">
                <slot :item="item"></slot>
            </li>
        </ul>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>

<style scoped lang='scss'>
.lp-virtual-item:hover {
    background-color: #eeeff1;
}

.lp-virtual-container {
    width: 400px;
    overflow: auto;
    position: relative;

    .lp-virtual-block {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
    }

    .lp-virtual-list {
        top: 0;
        left: 0;
        width: 100%;
        padding: 0;
    }
}
</style>