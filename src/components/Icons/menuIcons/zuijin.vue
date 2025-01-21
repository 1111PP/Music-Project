<script  setup>
import { ref } from 'vue'
const props = defineProps({
    color: {
        type: String,
        default: 'white',
    },
    //svg宽度
    width: {
        type: String,
        default: '20px',
    },
    //svg高度
    height: {
        type: String,
        default: '20px',
    },
})
</script>

<template>
    <svg t="1712641292430" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="29994" :width="width" :height="height">
        <path
            d="M512 58.181818C260.654545 58.181818 58.181818 260.654545 58.181818 512S260.654545 965.818182 512 965.818182 965.818182 763.345455 965.818182 512 763.345455 58.181818 512 58.181818z m232.727273 488.727273H512c-18.618182 0-34.909091-16.290909-34.909091-34.909091V279.272727c0-18.618182 16.290909-34.909091 34.909091-34.909091s34.909091 16.290909 34.909091 34.909091v197.818182H744.727273c18.618182 0 34.909091 16.290909 34.909091 34.909091s-16.290909 34.909091-34.909091 34.909091z"
            :fill="color" p-id="29995"></path>
    </svg>
</template>

<style scoped lang='scss'>
.icon {
    margin: 0 10px;
}
</style>