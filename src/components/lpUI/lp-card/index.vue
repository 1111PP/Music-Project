<!--
  卡片组件
   响应式尺寸，横向拉长时，宽度按照比例增长
  -->
<script setup>
import { ref, computed } from 'vue'
import settingInfo from '@/setting'
const props = defineProps({

    width: {
        type: [Number, String],
        default: '100%'
    },
    height: {
        type: [Number, String],
        default: '100%'
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
    responseSize: {
        type: Boolean,
        default: true
    }
})

const box = ref()
const dynamicStyle = (props) => {
    const { width, height, bgColor, bgImg, responseSize } = props
    if (!responseSize) {
        return {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            backgroundColor: bgColor,
            backgroundImage: bgImg ? `url(${bgImg})` : 'none',
            backgroundSize: bgImg ? 'cover' : 'none',
            backgroundRepeat: 'no-repeat',
        }
    }
    else {
        return {
            width: typeof width === 'number' ? `${width / settingInfo.INITSCREENWIDTH * 100}vw` : width,
            backgroundColor: bgColor,
            backgroundImage: bgImg ? `url(${bgImg})` : 'none',
            backgroundSize: bgImg ? 'cover' : 'none',
            backgroundRepeat: 'no-repeat',
            aspectRatio: typeof width === 'number' && typeof height === 'number' ? `${width} / ${height}` : 'auto'
        }
    }
}
</script>

<template>
    <div ref="box" class="card-container" :class="boxShadow ? 'boxShadow' : ''" :style="dynamicStyle(props)">
        <slot></slot>
    </div>
</template>

<style scoped lang='scss'>
.card-container {
    border-radius: 10px;
    overflow: auto;
}

.boxShadow {
    box-shadow: 0 0 15px #e4e3e3;

    &:hover {
        box-shadow: 0 0 15px #cfcfcf;
    }
}
</style>