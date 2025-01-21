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
    <svg t="1715066567198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8300"
        :width="width" :height="height">
        <path
            d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512C1024 227.84 793.6 0 512 0z m217.6 552.96L422.4 739.84c-2.56 2.56-7.68 2.56-12.8 2.56s-7.68 0-12.8-2.56c-7.68-5.12-12.8-12.8-12.8-23.04v-384c0-5.12 0-10.24 5.12-15.36 7.68-12.8 23.04-15.36 35.84-7.68l307.2 197.12c7.68 5.12 12.8 12.8 12.8 23.04-2.56 10.24-7.68 17.92-15.36 23.04z"
            :fill="color" p-id="8301"></path>
    </svg>
</template>

<style scoped lang='scss'></style>