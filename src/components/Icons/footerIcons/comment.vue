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
    <svg t="1715434366426" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9421"
        :width="width" :height="height">
        <path
            d="M371.2 454.4m-51.2 0a0.8 0.8 0 1 0 102.4 0 0.8 0.8 0 1 0-102.4 0ZM512 454.4m-51.2 0a0.8 0.8 0 1 0 102.4 0 0.8 0.8 0 1 0-102.4 0ZM652.8 454.4m-51.2 0a0.8 0.8 0 1 0 102.4 0 0.8 0.8 0 1 0-102.4 0ZM377.6 896c-6.4 0-6.4 0-12.8 0-12.8-6.4-19.2-19.2-19.2-32l0-128C211.2 684.8 128 569.6 128 448c0-179.2 172.8-320 384-320s384 140.8 384 320c0 172.8-166.4 313.6-371.2 320l-128 121.6C390.4 896 384 896 377.6 896zM512 192C332.8 192 192 307.2 192 448c0 102.4 76.8 192 192 236.8 12.8 6.4 19.2 19.2 19.2 32l0 76.8 83.2-76.8C492.8 704 505.6 704 512 704c179.2 0 320-115.2 320-256S691.2 192 512 192z"
            :fill="color" p-id="9422"></path>
    </svg>
</template>

<style scoped lang='scss'></style>