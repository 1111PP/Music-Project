<script  setup>
import { ref, onMounted } from 'vue'
import { singleReactiveSize } from '@/utils/pxToVh.js'
const props = defineProps({
    height: {
        type: Number,
        default: 0
    },
    width: {
        type: Number,
        default: 0
    },
    bgColor: {
        type: String,
        default: '#fff'
    },
    boxShadow: {
        type: Boolean,
        default: true
    },
    bgImg: {
        type: String,
        default: ''
    },
    // 是否开启响应式尺寸
    responseSize: {
        type: Boolean,
        default: true
    }
})
let box = ref()
onMounted(() => {
    if (props.responseSize) {
        // 处理元素box.value尺寸，使其保持响应式
        singleReactiveSize(box.value, props.width, props.height)
    } else {
        // 非响应式，直接设置px单位
        box.value.style.width = props.width + 'px'
        box.value.style.height = props.height + 'px'
    }
    box.value.style.background = props.bgImg ? `url(${props.bgImg}) no-repeat` : 'none'
    box.value.style.backgroundSize = props.bgImg ? `100% 100%` : 'none'
    box.value.style.backgroundColor = `${props.bgColor}`
})
</script>

<template>
    <div ref="box" class="card-container" :class="boxShadow ? 'boxShadow' : ''">
        <slot></slot>
    </div>
</template>

<style scoped lang='scss'>
.card-container {
    border-radius: 10px;
    overflow: auto; //💡🈯
}

.boxShadow {
    box-shadow: 0 0 15px #e4e3e3;

    &:hover {
        box-shadow: 0 0 15px #cfcfcf;
    }
}

.card-container::after {
    content: "";
    width: 100px;
    height: 100px;
    background-color: red;
}
</style>