<script  setup>
import { ref } from 'vue'
const props = defineProps({
    color: {
        type: String,
        default: 'gray',
    },
    //svg宽度
    width: {
        type: String,
        default: '15px',
    },
    //svg高度
    height: {
        type: String,
        default: '15px',
    },
})
const svgTarget = ref()
const changeStyle = () => {
    svgTarget.value.setAttribute('fill', 'red')
}
const clearStyle = () => {
    svgTarget.value.setAttribute('fill', 'gray')
}
defineExpose({ changeStyle, clearStyle })
</script>

<template>
    <svg t="1712734563337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5694"
        :width="width" :height="height">
        <path ref="svgTarget"
            d="M209.664 813.696a426.666667 426.666667 0 0 1 0-603.392 42.666667 42.666667 0 0 1 60.330667 60.330667 341.333333 341.333333 0 1 0 482.474666 0 42.666667 42.666667 0 0 1 60.330667-60.330667A426.666667 426.666667 0 0 1 209.664 813.696zM511.36 85.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v384a42.666667 42.666667 0 0 1-85.333334 0V128a42.666667 42.666667 0 0 1 42.666667-42.666667z"
            :fill="color" p-id="5695"></path>
    </svg>
</template>

<style scoped lang='scss'></style>