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
        default: '20',
    },
    //svg高度
    height: {
        type: String,
        default: '20',
    },
})
</script>

<template>
    <svg t="1715328770975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3671"
        :width="width" :height="height">
        <path
            d="M429.909333 872.789333h-211.2l232.106667-232.106666a43.946667 43.946667 0 1 0-62.208-62.165334L152.746667 814.208v-209.408a43.989333 43.989333 0 0 0-87.978667 0v312.021333c0 24.277333 19.669333 43.946667 43.989333 43.946667h320.981334a43.989333 43.989333 0 0 0 0.128-87.978667zM915.882667 64.853333h-320.981334a43.989333 43.989333 0 0 0 0 87.978667h211.114667L573.866667 384.853333a43.946667 43.946667 0 1 0 62.208 62.208l235.690666-235.733333V420.693333a43.989333 43.989333 0 0 0 87.978667 0V108.714667a43.818667 43.818667 0 0 0-43.904-43.946667z"
            :fill="color" p-id="3672"></path>
    </svg>
</template>

<style scoped lang='scss'></style>