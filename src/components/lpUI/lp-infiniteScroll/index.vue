<script  setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    //外部容器高度
    outHeight: {
        type: Number,
        default: 0
    },
    //列表总数居
    listData: {
        type: Array,
        default: () => []
    },
    //单次追加数据数量
    singlePushCount: {
        type: Number,
        default: 0
    }
})

const isShowLoad = ref(true)//展示loading效果
const loader = ref()//加载元素
const totalData = props.listData //总数据
const partData = ref([])//当前展示数据
//🟥初次渲染数量+每次追加列表数量
const singlePushCount = ref(props.singlePushCount)
//push新的列表
const setList = (start = 0) => {
    for (let i = start; i < Math.min(start + singlePushCount.value, totalData.length); i++) {
        partData.value.push(totalData[i])
    }
}
//监听列表底部
const observer = new IntersectionObserver((entries) => {
    //加载图标进入视口
    if (entries[0].isIntersecting) {
        // console.log(partData.value.length, totalData.length);
        if (partData.value.length >= totalData.length) {
            // console.log('end');
            isShowLoad.value = false
        }
        //加载100ms，push下一组数据
        setTimeout(() => {
            //计算下一组数据的起始位置
            let currIndex = partData.value.length
            if (currIndex < totalData.length) {
                setList(currIndex)//push新的列表
            }
        }, 100)
    }
})
onMounted(() => {
    setList()
    observer.observe(loader.value)
})
</script>

<template>
    <div ref="box" class="container" :style="{ height: `${outHeight}px` }">
        <div v-for="item in partData" :key="item.id">
            <slot :item="item"></slot>
        </div>
        <!-- 放置列表底部 -->
        <div v-if="isShowLoad" ref="loader" class="loader"></div>
    </div>
</template>

<style scoped lang='scss'>
.container {
    width: 400px;
    background-color: rgb(255, 255, 255);
    position: relative;
    overflow: auto;

    ul {
        position: absolute;
        width: 100%;
        left: 0;
        right: 0;
    }
}

.loader {
    width: 15px;
    height: 15px;
    margin: 0 auto;
    margin-bottom: 10px;
    border: 2px dashed #5c5c5c;
    border-width: 1px;
    /* 设置虚线边框 */
    border-radius: 50%;
    /* 将边框圆角设置为50%，使其呈现圆形 */
    animation: rotate 3s linear infinite;
    /* 应用旋转动画 */
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
        /* 从0度开始旋转 */
    }

    to {
        transform: rotate(360deg);
        /* 旋转一周（360度） */
    }
}
</style>